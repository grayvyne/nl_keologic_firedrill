import { Typeof, Validate } from '../lib/NLValdiate';
import { SchoolUser } from './User';

export enum GradeLevel {
    Kindergarten,
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    Sixth,
    Seventh,
    Eighth
}

export interface ClassRecord {
    readonly classID: number;
    readonly gradeLevel: GradeLevel;
    readonly students: SchoolUser[];
    readonly teachers: SchoolUser[];
}

@Validate
export class Class {
    @Typeof('number') public readonly classID: number;
    @Typeof('number') public readonly gradeLevel: GradeLevel;
    @Typeof('object') private readonly students: SchoolUser[];
    @Typeof('object') private readonly teachers: SchoolUser[];

    public constructor(record: ClassRecord) {
        this.classID = record.classID;
        this.gradeLevel = record.gradeLevel;
        this.students = record.students;
        this.teachers = record.teachers;
    }

    public getStudents(): SchoolUser[] {
        return this.students;
    }

    public getTeachers(): SchoolUser[] {
        return this.teachers;
    }
}
