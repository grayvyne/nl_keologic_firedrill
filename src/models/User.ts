import { Typeof, Validate } from '../lib/NLValdiate';

export enum UserRole {
    Student,
    Faculty,
    Principal
}

export namespace UserRole {
    /**
     * Returns the number value of all of the roles a user can be
     */
    export function allRoles(): UserRole[] {
        return Object.keys(UserRole)
            .map(key => UserRole[key])
            .filter(role => 'number' === typeof role);
    }
}

export interface UserRecord {
    readonly userID: number;
    readonly firstName: string;
    readonly lastName: string;
}

@Validate
export class User {
    @Typeof('number') public readonly userID: number;
    @Typeof('string') public readonly firstName: string;
    @Typeof('string') public readonly lastName: string;

    /**
     * Creates the base user object, with userID and first/last name.
     */
    public constructor(record: UserRecord) {
        this.userID = record.userID;
        this.firstName = record.firstName;
        this.lastName = record.lastName;
    }
}

export interface SchoolUserRecord extends UserRecord {
    readonly role: UserRole;
    readonly schoolID: number;
}

@Validate
export class SchoolUser extends User {
    @Typeof('number') public readonly schoolID: number;
    @Typeof('number') private readonly role: UserRole;

    /**
     * Creates a school user, adding schoolId and role to a user
     */
    public constructor(record: SchoolUserRecord) {
        super(record);

        this.role = record.role;
        this.schoolID = record.schoolID;
    }

    /**
     * Returns the SchoolUsers role
     */
    public getUserRole(): UserRole {
        return this.role;
    }
}
