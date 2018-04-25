import * as moment from 'moment';
import { ObservableMap, action, computed, observable } from 'mobx';
import { Firebase } from '../config/firebase';
import { FiredrillClass } from '../models/FiredrillClass';
import { Status, Student } from '../models/Student';
import { SchoolUser } from '../models/User';
import { ApplicationServices } from '../services/ApplicationServices';
import { SchoolServices } from '../services/SchoolServices';

export class FiredrillStore {
    @observable private currentUserID: number;
    @observable private currentFiredrillID: number;

    @observable private _classes: ObservableMap<number, FiredrillClass> = new ObservableMap();
    @computed
    public get classes(): Map<number, FiredrillClass> {
        return this._classes.toJS();
    }
    @computed
    public get allClasses(): FiredrillClass[] {
        return Array.from(this._classes.values());
    }
    @computed
    public get unclaimedClasses(): FiredrillClass[] {
        return this.allClasses.filter(c => null == c.claimedByID);
    }
    @computed
    public get myClasses(): FiredrillClass[] {
        return this.allClasses.filter(c => c.claimedByID === this.currentUserID);
    }

    @computed
    public get allStudents(): Student[] {
        return this.allClasses.reduce<Student[]>((a, c) => a.concat([...c.students]), []);
    }
    @computed
    public get allStudentsCount(): number {
        return this.allStudents.length;
    }
    @computed
    public get missingStudentsCount(): number {
        return this.allStudents.filter(s => s.status === Status.Missing).length;
    }

    @computed
    public get teachers(): SchoolUser[] {
        return this.allClasses.reduce<SchoolUser[]>((a, c) => a.concat([...c.getTeachers()]), []);
    }

    private firedrillElapsedTimeTracker: NodeJS.Timer | undefined = undefined;
    @observable private _firedrillElapsedTime: string = '0:00';
    @computed
    public get firedrillElapsedTime(): string {
        return this._firedrillElapsedTime;
    }

    public constructor() {
        this.setup();
    }

    @action
    public async setup(): Promise<void> {
        const user = await ApplicationServices.getCurrentUser();
        this.currentUserID = user.userID;
        await Firebase.Auth.signInAnonymouslyAndRetrieveData();
        const schools = await SchoolServices.getSchools();
        schools.forEach(school =>
            Firebase.Listeners.activeFiredrillForSchool(school.schoolID, firedrill => {
                if (null != firedrill && null == this.currentFiredrillID) {
                    this.startFiredrill(school.schoolID);
                } else if (null == firedrill && null != this.currentFiredrillID) {
                    this.stopFiredrill();
                }
            })
        );
    }

    public getClaimedByNameForClass(aClass: FiredrillClass): string {
        const claimedByUser = [...this.teachers, ...this.allStudents].find(user => user.userID === aClass.claimedByID);
        if (null == claimedByUser) {
            return '';
        }

        return claimedByUser.firstName + ' ' + claimedByUser.lastName;
    }

    public claimClass(classID: number): Promise<void> {
        return Firebase.Refs.classFiredrillData(this.currentFiredrillID, classID).update({
            claimedByID: this.currentUserID
        });
    }

    public markStudentAsMissiong(studentID: number): Promise<void> {
        return this.saveStudentStatus(studentID, Status.Missing);
    }

    public markStudentAsFound(studentID: number): Promise<void> {
        return this.saveStudentStatus(studentID, Status.Found);
    }

    public markStudentAsAbsent(studentID: number): Promise<void> {
        return this.saveStudentStatus(studentID, Status.Absent);
    }

    private saveStudentStatus(studentID: number, status: Status): Promise<void> {
        return Firebase.Refs.studentFiredrillStatus(this.currentFiredrillID, studentID).update({ status });
    }

    @action
    private async startFiredrill(firedrillID: number): Promise<void> {
        this.currentFiredrillID = firedrillID;
        const classes = await SchoolServices.getClassesForSchool(firedrillID);
        classes.map(c => new FiredrillClass(c)).forEach(c => this._classes.set(c.classID, c));

        this.addFiredrillDataListeners(firedrillID);

        this.trackFiredrillElapsedTime();
    }

    private addFiredrillDataListeners(firedrillID: number) {
        this.allClasses.forEach(aClass => {
            Firebase.Listeners.classFiredrillData(firedrillID, aClass.classID, handleClassClaimedByChange(aClass));
            aClass.students.forEach(student =>
                Firebase.Listeners.studentFiredrillStatus(
                    firedrillID,
                    student.userID,
                    handleStudentStatusChange(student)
                )
            );
        });
    }

    @action
    private trackFiredrillElapsedTime() {
        this.firedrillElapsedTimeTracker = setInterval(async () => {
            const startTime = await Firebase.Getters.activeFiredrillStartTimeForSchool(this.currentFiredrillID);
            if (null == startTime) {
                return;
            }
            this._firedrillElapsedTime = moment(Date.now() - startTime).format('m:ss');
        }, 1000);
    }

    @action
    private stopFiredrill(): void {
        this.allClasses.forEach(aClass => {
            Firebase.Refs.classFiredrillData(this.currentFiredrillID, aClass.classID).off();
            aClass.students.forEach(student =>
                Firebase.Refs.studentFiredrillStatus(this.currentFiredrillID, student.userID).off()
            );
        });
        if (null != this.firedrillElapsedTimeTracker) {
            clearInterval(this.firedrillElapsedTimeTracker);
        }
    }
}

function handleStudentStatusChange(student: Student): (newStatus: { status: Status } | null) => void {
    return newStatus => {
        if (null == newStatus) {
            return;
        }
        switch (newStatus.status) {
            case Status.Missing:
                student.markAsMissing();
                break;
            case Status.Absent:
                student.markAsAbsent();
                break;
            case Status.Found:
                student.markAsFound();
                break;
            default:
                throw new Error(
                    'Case is unaccounted for @handleStudentStatusChange(), for case: `' +
                        newStatus.status +
                        '`. #FiredrillStore.ts'
                );
        }
    };
}

function handleClassClaimedByChange(aClass: FiredrillClass): (newStatus: { claimedByID: number } | null) => void {
    return newStatus => {
        if (null == newStatus) {
            aClass.unclaim();
        } else {
            aClass.claim(newStatus.claimedByID);
        }
    };
}
