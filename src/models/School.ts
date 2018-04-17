import { Typeof, Validate } from '../lib/NLValdiate';
import { Class } from './Class';
import { SchoolUser, User, UserRole } from './User';

export interface SchoolRecord {
    readonly schoolID: number;
    readonly name: string;
    readonly address1: string;
    readonly address2: string | null;
    readonly city: string;
    readonly state: string;
    readonly postalCode: string;
    usersByRole: Map<UserRole, SchoolUser[]>;
    classes: Class[];
}

@Validate
export class School {
    @Typeof('number') public readonly schoolID: number;
    @Typeof('string') public readonly name: string;
    @Typeof('string') public readonly address1: string;
    @Typeof(['string', 'object'])
    public readonly address2: string | null;
    @Typeof('string') public readonly city: string;
    @Typeof('string') public readonly state: string;
    @Typeof('string') public readonly postalCode: string;
    @Typeof('object') private usersByRole: Map<UserRole, SchoolUser[]>;
    @Typeof('object') private classes: Class[];

    public constructor(record: SchoolRecord) {
        this.schoolID = record.schoolID;
        this.name = record.name;
        this.address1 = record.address1;
        this.address2 = record.address2;
        this.city = record.city;
        this.state = record.state;
        this.postalCode = record.postalCode;
        this.classes = record.classes;
        this.usersByRole = new Map(record.usersByRole);
    }

    public getFaculty(): User[] {
        const faculty = this.usersByRole.get(UserRole.Faculty);
        const principals = this.usersByRole.get(UserRole.Principal);
        if (null == faculty || null == principals) {
            throw Error('usersByRole did not contain an array for faculty or principal');
        }
        return [...faculty, ...principals];
    }

    public getStudents(): User[] {
        const students = this.usersByRole.get(UserRole.Student);
        if (null == students) {
            throw Error('usersByRole did not contain an array for student');
        }
        return students;
    }

    public getCommunity(): User[] {
        return [...this.getFaculty(), ...this.getStudents()];
    }

    public getClasses(): Class[] {
        return this.classes;
    }
}