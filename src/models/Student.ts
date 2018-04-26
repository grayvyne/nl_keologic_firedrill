import { computed, observable } from 'mobx';
import { Typeof } from '../lib/NLValdiate';
import { SchoolUser } from './User';

export enum Status {
    Missing = 'Missing',
    Absent = 'Absent',
    Found = 'Found'
}

export class Student extends SchoolUser {
    @Typeof('number')
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
