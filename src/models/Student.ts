import { observable } from 'mobx';
import { Typeof, Validate } from '../lib/NLValdiate';
import { SchoolUser } from './User';

export enum Status {
    Missing,
    Absent,
    Found
}

@Validate
export class Student extends SchoolUser {
    @observable
    @Typeof('number')
    private status: Status = Status.Found;

    public getStatus(): Status {
        return this.status;
    }

    public markAsFound(): void {
        this.status = Status.Found;
    }

    public markAsAbsent(): void {
        this.status = Status.Absent;
    }

    public markAsMissing(): void {
        this.status = Status.Missing;
    }
}
