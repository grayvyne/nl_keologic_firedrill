import { ObservableMap, action, computed, observable } from 'mobx';
import { Firebase } from '../config/firebase';
import { FiredrillClass } from '../models/FiredrillClass';
import { Status, Student } from '../models/Student';
import { SchoolServices } from '../services/SchoolServices';
import { ApplicationServices } from '../services/ApplicationServices';

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
            Firebase.Refs.addActiveFiredrillForSchoolListener(school.schoolID, firedrill => {
                if (null != firedrill) {
                    this.startFiredrill(school.schoolID);
                }
            })
        );
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

    public claimClass(classID: number): Promise<void> {
        ApplicationServices.log('Claiming a class', classID, this.currentUserID);
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
