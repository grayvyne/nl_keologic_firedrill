import { ObservableMap, action, computed, observable } from 'mobx';
import { Firebase } from '../config/firebase';
import { FiredrillClass } from '../models/FiredrillClass';
import { Status, Student } from '../models/Student';
import { SchoolServices } from '../services/SchoolServices';
import { ApplicationServices } from '../services/ApplicationServices';

export class FiredrillStore {
    @observable private currentUserID: number;

    @observable private classes: ObservableMap<number, FiredrillClass> = new ObservableMap();
    @computed
    public get allClasses(): FiredrillClass[] {
        return Array.from(this.classes.values());
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
        this.setup().then(() => this.startFiredrill('test-fd'));
    }

    @action
    public async setup(): Promise<void> {
        const user = await ApplicationServices.getCurrentUser();
        this.currentUserID = user.userID;
        await Firebase.Auth.signInAnonymouslyAndRetrieveData();

        const classes = await SchoolServices.getClasses();
        classes.map(c => new FiredrillClass(c)).forEach(c => this.classes.set(c.classID, c));
    }

    @action
    public startFiredrill(firedrillID: string): void {
        this.allStudents.forEach(student => this.markStudentAsFound(student.userID));
        this.allClasses.forEach(c => {
            c.students.forEach(student =>
                Firebase.Refs.addStudentFiredrillStatusListener(
                    firedrillID,
                    student.userID,
                    handleStudentStatusChange(student)
                )
            );
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
        return Firebase.Refs.studentFiredrillStatus('test-fd', studentID).update({ status });
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
            default:
                student.markAsFound();
                break;
        }
    };
}
