import { computed, observable } from 'mobx';
import { Typeof, Validate } from '../lib/NLValdiate';
import { Status } from './Status';
import { SchoolUser } from './User';

/**
 * This is used to add properties to users with the Student role
 */
@Validate
export class Student extends SchoolUser {
    @Typeof('string')
    @observable
    private _status: Status = Status.Found;

    /**
     * Returns the students current status
     */
    @computed
    public get status(): Status {
        return this._status;
    }

    /**
     * Checks if the student's status is set to: Missing
     */
    @computed
    public get isMissing(): boolean {
        return this._status === Status.Missing;
    }

    /**
     * Returns the text that is used in our search functionality
     */
    public get searchableText(): string {
        return this.firstName + ' ' + this.lastName;
    }

    /**
     * Sets student status to: Found
     */
    public markAsFound(): void {
        this._status = Status.Found;
    }

    /**
     * Sets student status to: Absent
     */
    public markAsAbsent(): void {
        this._status = Status.Absent;
    }

    /**
     * Sets student status to: Missing
     */
    public markAsMissing(): void {
        this._status = Status.Missing;
    }
}
