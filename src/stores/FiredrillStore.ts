import { ObservableMap, action, computed, observable, observe } from 'mobx';
import { Firebase } from '../config/firebase';
import { FiredrillClass } from '../models/FiredrillClass';
import { Status, Student } from '../models/Student';
import { ApplicationServices } from '../services/ApplicationServices';
import { SchoolServices } from '../services/SchoolServices';

export class FiredrillStore {
    // private currentUserID: number;

    @observable private classes: ObservableMap<number, FiredrillClass> = new ObservableMap();
    @computed
    public get allClasses(): FiredrillClass[] {
        return Array.from(this.classes.values());
    }
    @computed
    public get claimedClasses(): FiredrillClass[] {
        return this.allClasses.filter(c => null !== c.claimedByID);
    }

    @observable private students: ObservableMap<number, Student> = new ObservableMap();
    @computed
    public get allStudents(): Student[] {
        return Array.from(this.students.values());
    }
    @computed
    public get allStudentsCount(): number {
        return this.allStudents.length;
    }
    @computed
    public get missingStudentsCount(): number {
        return this.allStudents.filter(s => s.getStatus() === Status.Missing).length;
    }

    public constructor() {
        ApplicationServices.log('Starting FD Stor');
        ApplicationServices.log('bobson');
        this.setup()
            .then(() => this.startFiredrill('test-fd'))
            .then(() => this.students.forEach(student => observe(student, ApplicationServices.log)))
            .then(() => ApplicationServices.log('init firedrill'))
            .catch(ApplicationServices.logError);
        // setTimeout(() => {
        //     ApplicationServices.log('fd constructor');
        // }, 1000);
    }

    @action
    public async setup(): Promise<void> {
        // const user = await ApplicationServices.getCurrentUser();
        // this.currentUserID = user.userID;
        ApplicationServices.log('about to sign in');
        await Firebase.Auth.signInAnonymouslyAndRetrieveData().catch(ApplicationServices.logError);
        ApplicationServices.log('signed in now');
        ApplicationServices.log('user?', Firebase.Auth.currentUser);

        const students = await SchoolServices.getStudents();
        students.forEach(student => this.students.set(student.userID, student));

        const classes = await SchoolServices.getClasses();
        classes
            .map(
                c =>
                    new FiredrillClass({
                        classID: c.classID,
                        students: c.getStudents(),
                        gradeLevel: c.gradeLevel,
                        teachers: c.getTeachers()
                    })
            )
            .forEach(c => this.classes.set(c.classID, c));
    }

    @action
    public startFiredrill(firedrillID: string): void {
        ApplicationServices.log('starting firedrill');
        this.allStudents.forEach(student => this.markStudentAsFound(student.userID));
        this.allStudents.forEach(student => {
            Firebase.Refs.addStudentFiredrillStatusListener(
                firedrillID,
                student.userID,
                handleStudentStatusChange(student)
            );
        });
    }

    public markStudentAsMissiong(studentID: number): Promise<void> {
        return this.saveStudentStatus(studentID, Status.Missing);
    }

    public markStudentAsFound(studentID: number): Promise<void> {
        return this.saveStudentStatus(studentID, Status.Found).catch(ApplicationServices.logError);
    }

    public markStudentAsAbsent(studentID: number): Promise<void> {
        return this.saveStudentStatus(studentID, Status.Absent);
    }

    private saveStudentStatus(studentID: number, status: Status): Promise<void> {
        ApplicationServices.log('Saving a student', studentID, status);
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
