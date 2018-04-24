import { observable, computed } from 'mobx';
import { SchoolUser } from './User';
import { Typeof } from '../lib/NLValdiate';

export enum Status {
    Missing,
    Absent,
    Found
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
