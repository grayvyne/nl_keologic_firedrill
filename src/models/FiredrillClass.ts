import { action, computed, observable } from 'mobx';
import { Typeof, Validate } from '../lib/NLValdiate';
import { Class, GradeLevel } from './Class';
import { Status } from './Status';
import { Student } from './Student';
import { SchoolUserRecord } from './User';

export interface ClassRecord {
    readonly classID: number;
    readonly name: string | undefined;
    readonly gradeLevel: GradeLevel;
    readonly students: SchoolUserRecord[];
    readonly teachers: SchoolUserRecord[];
}

/**
 * Creates a Class used to store data about a firedrill
 */
@Validate
export class FiredrillClass extends Class {
    /**
     * Returns the user id of the user who claimed the class during the firedrill
     */
    @computed
    public get claimedByUserID(): number | null {
        return this._claimedByID;
    }

    /**
     * Returns the number of students within the class
     */
    @computed
    public get totalStudents(): number {
        return this._students.filter(s => s.status !== Status.Absent).length;
    }

    /**
     * Returns all students with the status "Found"
     */
    @computed
    public get foundStudents(): number {
        return this._students.filter(s => s.status === Status.Found || s.status === Status.Default).length;
    }

    /**
     * Returns the searchable text string to match against in the search bar
     */
    public get searchableText(): string {
        return this.name + 'grade ' + this.gradeLevel;
    }

    @Typeof('number', 'object')
    @observable
    private _claimedByID: number | null;

    @Typeof('object')
    @observable
    private _students: Student[];

    /**
     * Creates a firedrill class record, and initiates its claimedByID to null
     * @param {ClassRecord} record
     */
    public constructor(record: ClassRecord) {
        super(record);
        this._claimedByID = null;
        this._students = record.students.map(s => new Student(s)).sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
    }

    /**
     * Public action that claims the class and sets its id to the teacherID who claimed it
     * @param teacherID
     */
    @action
    public claim(teacherID: number): void {
        this._claimedByID = teacherID;
    }

    /**
     * Public action that unclaims a class, resetting the claimedByID
     */
    @action
    public unclaim(): void {
        this._claimedByID = null;
    }

    /**
     * Returns an array students that are associated with this firedrill class
     */
    @computed
    public get students(): Student[] {
        return this._students;
    }
}
