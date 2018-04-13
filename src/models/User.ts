import { Typeof, Validate } from '../lib/NLValdiate';

export enum UserRole {
    Student,
    Faculty,
    Principal
}

export interface UserRecord {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
}

@Validate
export class User {
    @Typeof('number') public readonly userID: number;
    @Typeof('string') public readonly firstName: string;
    @Typeof('string') public readonly lastName: string;

    public constructor(record: UserRecord) {
        this.userID = record.id;
        this.firstName = record.firstName;
        this.lastName = record.lastName;
    }
}

export interface SchoolUserRecord extends UserRecord {
    readonly role: UserRole;
}

@Validate
export class SchoolUser extends User {
    @Typeof('number') private readonly role: UserRole;

    public constructor(record: SchoolUserRecord) {
        super(record);

        this.role = record.role;
    }

    public getUserRole(): UserRole {
        return this.role;
    }
}
