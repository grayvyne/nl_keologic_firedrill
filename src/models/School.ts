import { Typeof, Validate } from '../lib/NLValdiate';
import { Class } from './Class';
import { ClassRecord } from './FiredrillClass';
import { SchoolUser, SchoolUserRecord, UserRole } from './User';

export interface SchoolRecord {
    readonly schoolID: number;
    readonly name: string;
    readonly address1: string;
    readonly address2: string | null;
    readonly city: string;
    readonly state: string;
    readonly postalCode: string;
    usersByRole: [UserRole, SchoolUserRecord[]][];
    classes: ClassRecord[];
}

/**
 * Creates a School object representing the a school from the database with all of its descriptive information as well as the users associated with it
 */
@Validate
export class School {
    @Typeof('number') public readonly schoolID: number;
    @Typeof('string') public readonly name: string;
    @Typeof('string') public readonly address1: string;
    @Typeof('string', 'object')
    public readonly address2: string | null;
    @Typeof('string') public readonly city: string;
    @Typeof('string') public readonly state: string;
    @Typeof('string') public readonly postalCode: string;
    @Typeof('object') private usersByRole: Map<UserRole, SchoolUser[]>;
    @Typeof('object') private classes: Class[];

    /**
     * Creates a school object and assigns/creates users objects with roles.
     * @param {SchoolRecord} record
     */
    public constructor(record: SchoolRecord) {
        this.schoolID = record.schoolID;
        this.name = record.name;
        this.address1 = record.address1;
        this.address2 = record.address2;
        this.city = record.city;
        this.state = record.state;
        this.postalCode = record.postalCode;
        this.classes = record.classes.map(c => new Class(c));

        this.usersByRole = new Map(
            record.usersByRole.map<[UserRole, SchoolUser[]]>(([role, users]) => [
                role,
                users.map(user => new SchoolUser(user))
            ])
        );
    }

    /**
     * Returns the users in the school, excluding those with a role of Student: (teachers, principal, office staff);
     */
    public getStaff(): SchoolUser[] {
        const staffRoles = UserRole.allRoles().filter(role => role !== UserRole.Student);
        const usersForStaffRoles = staffRoles
            .map(role => this.usersByRole.get(role))
            .filter(users => users !== undefined);
        return usersForStaffRoles.reduce<SchoolUser[]>((staff, users) => [...staff, ...users!], []);
    }

    /**
     * Returns the users in the school with the role of Student
     */
    public getStudents(): SchoolUser[] {
        const students = this.usersByRole.get(UserRole.Student);
        if (null == students) {
            throw new Error('usersByRole did not contain an array for student');
        }
        return students;
    }

    /**
     * Returns all users within the school
     */
    public getCommunity(): SchoolUser[] {
        return [...this.getStaff(), ...this.getStudents()];
    }

    /**
     * Returns all classes within the school
     */
    public getClasses(): Class[] {
        return this.classes;
    }
}
