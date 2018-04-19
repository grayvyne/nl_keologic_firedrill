import { action, computed, observable } from 'mobx';
import { Typeof, Validate } from '../lib/NLValdiate';
import { Class } from './Class';

@Validate
export class FiredrillClass extends Class {
    @Typeof(['number', 'object'])
    @observable
    private _claimedByID: number | null = null;
    @computed
    public get claimedByID(): number | null {
        return this._claimedByID;
    }

    constructor(record: any) {
        super(record);
        this._claimedByID = null;
    }

    @action
    public claim(teacherID: number): void {
        this._claimedByID = teacherID;
    }
}
