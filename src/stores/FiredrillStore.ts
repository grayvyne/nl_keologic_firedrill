import { ObservableMap, action, computed, observable } from 'mobx';
import * as moment from 'moment';
import * as uuid from 'uuid';
import { Firebase } from '../config/firebase';
import { FiredrillClass } from '../models/FiredrillClass';
import { School } from '../models/School';
import { Status, Student } from '../models/Student';
import { SchoolUser, UserRole } from '../models/User';
import { ApplicationServices } from '../services/ApplicationServices';
import { SchoolServices } from '../services/SchoolServices';

export class FiredrillStore {
    @observable private currentUser: SchoolUser;
    @observable private currentFiredrillID: number | null = null;
    @computed
    public get activeFiredrillID(): number {
        if (null == this.currentFiredrillID) {
            throw new Error('No firedrill is currently active');
        }
        return this.currentFiredrillID;
    }

    @observable private _school: School | null;

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
        return this.allClasses.filter(c => null == c.claimedByUserID);
    }
    @computed
    public get myClasses(): FiredrillClass[] {
        return this.allClasses.filter(c => c.claimedByUserID === this.currentUser.userID);
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
    public get staff(): SchoolUser[] {
        if (null == this._school) {
            return [];
        }
        return this._school.getStaff();
    }

    private firedrillElapsedTimeTracker: NodeJS.Timer | undefined = undefined;
    @observable private _firedrillElapsedTime: string = '0:00';
    @computed
    public get firedrillElapsedTime(): string {
        return this._firedrillElapsedTime;
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
        this.currentUser = user;
        await Firebase.Auth.signInAnonymouslyAndRetrieveData();
        Firebase.Listeners.activeFiredrillForSchool(user.schoolID, firedrill => {
            if (null != firedrill && null == this.currentFiredrillID) {
                this.startFiredrill(user.schoolID);
            } else if (null == firedrill && null != this.currentFiredrillID) {
                this.stopFiredrill();
            }
        });
    }

    public getClaimedByNameForClass(aClass: FiredrillClass): string {
        const claimedByUser = this.staff.find(user => user.userID === aClass.claimedByUserID);
        if (null == claimedByUser) {
            return '';
        }

        return claimedByUser.firstName + ' ' + claimedByUser.lastName;
    }

    public claimClass(classID: number): Promise<void> {
        return Firebase.Refs.classFiredrillData(this.activeFiredrillID, classID).update({
            claimedByID: this.currentUser.userID
        });
    }

    public async initiateFiredrill(schoolID: number): Promise<void> {
        const school = await SchoolServices.getSchool();
        await this.createNewFiredrill(schoolID);
        return ApplicationServices.sendNotification(schoolID, `A firedrill is starting at ${school.name}`);
    }

    public async endFireDrill(): Promise<void> {
        const school = await SchoolServices.getSchool();

        await ApplicationServices.sendNotification(
            this.activeFiredrillID,
            `The fire drill at ${school.name} has ended`
        );
        return this.saveFinishedFiredrill();
    }

    public async cancelFiredrill(): Promise<void> {
        const school = await SchoolServices.getSchool();
        await ApplicationServices.sendNotification(
            this.activeFiredrillID,
            `The fire drill at ${school.name} has been cancelled`
        );
        return this.clearActiveFiredrill();
    }

    public async saveStudentsStatuses(students: Student[]): Promise<void> {
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
        return Firebase.Refs.studentFiredrillStatus(this.activeFiredrillID, studentID).update({ status });
    }

    private createNewFiredrill(schoolID: number): Promise<void> {
        return Firebase.Refs.activeFiredrillForSchool(schoolID).set({
            startTime: Date.now(),
            firedrillID: uuid()
        });
    }

    private async saveFinishedFiredrill(): Promise<void> {
        const firebaseData = await Firebase.Getters.activeFiredrillData(this.activeFiredrillID);
        if (null == firebaseData) {
            return;
        }
        await Firebase.Refs.finishedFiredrillForSchool(this.activeFiredrillID, firebaseData.firedrillID).set(
            firebaseData
        );
        return this.clearActiveFiredrill();
    }

    private clearActiveFiredrill(): Promise<void> {
        return Firebase.Refs.activeFiredrillForSchool(this.activeFiredrillID).set(null);
    }

    @action
    private async startFiredrill(firedrillID: number): Promise<void> {
        this._classes = new ObservableMap();
        this.currentFiredrillID = firedrillID;
        const [classes, school] = await Promise.all([
            SchoolServices.getClassesForSchool(firedrillID),
            SchoolServices.getSchool()
        ]);
        this._school = school;
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
            const startTime = await Firebase.Getters.activeFiredrillStartTimeForSchool(this.activeFiredrillID);
            if (null == startTime) {
                return;
            }
            this._firedrillElapsedTime = moment(Date.now() - startTime).format('m:ss');
        }, 1000);
    }

    @action
    private stopFiredrill(): void {
        this.allClasses.forEach(aClass => {
            Firebase.Refs.classFiredrillData(this.activeFiredrillID, aClass.classID).off();
            aClass.students.forEach(student =>
                Firebase.Refs.studentFiredrillStatus(this.activeFiredrillID, student.userID).off()
            );
        });
        if (null != this.firedrillElapsedTimeTracker) {
            clearInterval(this.firedrillElapsedTimeTracker);
        }
        this._classes = new ObservableMap();
        this.currentFiredrillID = null;
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
