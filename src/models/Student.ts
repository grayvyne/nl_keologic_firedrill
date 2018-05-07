import { computed, observable } from 'mobx';
import { Typeof, Validate } from '../lib/NLValdiate';
import { Status } from './Status';
import { SchoolUser } from './User';

@Validate
export class Student extends SchoolUser {
    @Typeof('string')
    @observable
    private _status: Status = Status.Found;

    @computed
    public get status(): Status {
        return this._status;
    }

    @computed
    public get isMissing(): boolean {
        return this._status === Status.Missing;
    }

    public get searchableText(): string {
        return this.firstName + ' ' + this.lastName;
    }

    public markAsFound(): void {
        this._status = Status.Found;
    }

    public markAsAbsent(): void {
        this._status = Status.Absent;
    }

    public markAsMissing(): void {
        this._status = Status.Missing;
    }
}
