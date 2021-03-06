import { Typeof, Validate } from '../lib/NLValdiate';
import { SchoolUser, SchoolUserRecord } from './User';

export enum GradeLevel {
    Kindergarten,
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    Sixth,
    Seventh,
    Eighth,
    Ninth,
    Tenth,
    Eleventh,
    Twelth
}

/**
 * Creates a representational string from the gradeLevel property of a "Class".
 * Used to display grade level in the UI
 * @param {number} gradeLevel
 */
export function getGradeTitleFromGradeLevel(gradeLevel: number) {
    switch (gradeLevel) {
        case 0:
            return 'Kindergarten';
        default:
            return 'Grade ' + gradeLevel;
    }
}

export interface ClassRecord {
    readonly classID: number;
    readonly name: string | undefined;
    readonly gradeLevel: GradeLevel;
    readonly students: SchoolUserRecord[];
    readonly teachers: SchoolUserRecord[];
}

@Validate
export class Class {
    @Typeof('number') public readonly classID: number;
    @Typeof('string') public readonly name: string;
    @Typeof('number') public readonly gradeLevel: GradeLevel;
    @Typeof('object') private readonly _users: SchoolUser[];
    @Typeof('object') private readonly teachers: SchoolUser[];

    /**
     * Creates a "Class" object which holds information about grade level, students, and teachers belonging to the class.
     * @param { ClassRecord } record
     */
    public constructor(record: ClassRecord) {
        this.classID = record.classID;
        this.gradeLevel = record.gradeLevel;
        this._users = record.students.map(s => new SchoolUser(s));
        this.teachers = record.teachers.map(s => new SchoolUser(s));

        const firstTeacher = record.teachers[0];
        if (null != record.name) {
            this.name = record.name;
        } else if (null != firstTeacher) {
            this.name = firstTeacher.lastName;
        } else {
            this.name = '';
        }
    }
    /**
     * Returns a list of students associated with the class
     */
    public get users(): SchoolUser[] {
        return this._users;
    }

    /**
     * Returns a list of teachers associated with the class
     */
    public getTeachers(): SchoolUser[] {
        return this.teachers;
    }
}
