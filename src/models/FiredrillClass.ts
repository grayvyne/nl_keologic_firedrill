import { action, computed, observable } from 'mobx';
import { Class, GradeLevel } from './Class';
import { Status, Student } from './Student';
import { SchoolUserRecord } from './User';

export interface ClassRecord {
    readonly classID: number;
    readonly name: string | undefined;
    readonly gradeLevel: GradeLevel;
    readonly students: SchoolUserRecord[];
    readonly teachers: SchoolUserRecord[];
}

export class FiredrillClass extends Class {
    @computed
    public get claimedByUserID(): number | null {
        return this._claimedByID;
    }

    @computed
    public get totalStudents(): number {
        return this._students.length;
    }

    @computed
    public get foundStudents(): number {
        return this._students.filter(s => s.status === Status.Found).length;
    }

    @observable private _claimedByID: number | null;

    @observable private _students: Student[];

    public constructor(record: ClassRecord) {
        super(record);
        this._claimedByID = null;
        this._students = record.students.map(s => new Student(s));
    }

    @action
    public claim(teacherID: number): void {
        this._claimedByID = teacherID;
    }

    @action
    public unclaim(): void {
        this._claimedByID = null;
    }

    @computed
    public get students(): Student[] {
        return this._students;
    }
}
