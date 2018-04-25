import { ObservableMap, action, computed, observable } from 'mobx';
import { Firebase } from '../config/firebase';
import { FiredrillClass } from '../models/FiredrillClass';
import { Status, Student } from '../models/Student';
import { SchoolUser, UserRole } from '../models/User';
import { ApplicationServices } from '../services/ApplicationServices';
import { SchoolServices } from '../services/SchoolServices';

export class FiredrillStore {
    @observable private currentUser: SchoolUser;
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
        return this.allClasses.filter(c => c.claimedByID === this.currentUser.userID);
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

    @computed
    public get shouldShowManage(): boolean {
        return this.currentUser.getUserRole() === UserRole.Principal;
    }

    public constructor() {
        this.setup();
    }

    @action
    public async setup(): Promise<void> {
        const user = await ApplicationServices.getCurrentUser();
        const schools = await SchoolServices.getSchools();
        const firstSchool = schools[0];
        if (null == firstSchool) {
            throw new Error('User must be part of a school');
        }
        const currentUser = firstSchool.getCommunity().find(schoolUser => user.userID === schoolUser.userID);
        if (null == currentUser) {
            throw new Error('User must be part of the school that they are part of!');
        }
        this.currentUser = currentUser;
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
            claimedByID: this.currentUser
        });
    }

    public async initiateFiredrill(schoolID: number): Promise<void> {
        const schools = await SchoolServices.getSchools();
        const school = schools.find(s => s.schoolID === schoolID);
        if (null == school) {
            throw new Error(`School ID ${schoolID} is not an available school`);
        }
        Firebase.Refs.acitveFiredrillForSchool(schoolID).set({ startTime: Date.now() });
        return ApplicationServices.sendNotification(schoolID, `A firedrill is starting at ${school.name}`);
    }

    public async endFireDrill(): Promise<void> {
        const schools = await SchoolServices.getSchools();
        const school = schools.find(s => s.schoolID === this.currentFiredrillID);
        if (null == school) {
            throw new Error(`School ID ${this.currentFiredrillID} is not an available school`);
        }
        Firebase.Refs.acitveFiredrillForSchool(this.currentFiredrillID).set(null);
        return ApplicationServices.sendNotification(
            this.currentFiredrillID,
            `The fire drill at ${school.name} has ended`
        );
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
