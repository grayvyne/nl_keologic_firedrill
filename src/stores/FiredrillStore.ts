import { ObservableMap, action, computed, observable } from 'mobx';
import { Firebase } from '../config/firebase';
import { FiredrillClass } from '../models/FiredrillClass';
import { Student } from '../models/Student';
import { SchoolUser } from '../models/User';
import { ApplicationServices } from '../services/ApplicationServices';
import { SchoolServices } from '../services/SchoolServices';
import { Status } from '../models/Status';

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

    public constructor() {
        this.setup();
    }

    @action
    public async setup(): Promise<void> {
        const user = await ApplicationServices.getCurrentUser();
        this.currentUserID = user.userID;
        await Firebase.Auth.signInAnonymouslyAndRetrieveData();
        Firebase.Refs.addActiveFiredrillForSchoolListener(user.schoolID, firedrill => {
            if (null != firedrill && null == this.currentFiredrillID) {
                this.startFiredrill(user.schoolID);
            }
        });
    }

    @action
    public async startFiredrill(firedrillID: number): Promise<void> {
        this.currentFiredrillID = firedrillID;
        const classes = await SchoolServices.getClassesForSchool(firedrillID);
        classes.map(c => new FiredrillClass(c)).forEach(c => this._classes.set(c.classID, c));

        this.allClasses.forEach(aClass => {
            aClass.students.forEach(student =>
                Firebase.Refs.addStudentFiredrillStatusListener(
                    firedrillID,
                    student.userID,
                    handleStudentStatusChange(student)
                )
            );
        });
        this.allClasses.forEach(aClass =>
            Firebase.Refs.addClassFiredrillClaimedListener(
                firedrillID,
                aClass.classID,
                handleClassClaimedByChange(aClass)
            )
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

    public async saveMultipleStudentStatuses(students: Student[]): Promise<void> {
        await Promise.all(students.map(student => this.saveStudentStatus(student.userID, student.status)));
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
