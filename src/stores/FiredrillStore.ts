/**
 * @module FiredrillStore
 * @exports FiredrillStore
 */

import { ObservableMap, action, computed, observable } from 'mobx';
import * as moment from 'moment';
import * as uuid from 'uuid';
import { Firebase } from '../config/firebase';
import { ManageFiredrillStrings } from '../config/uiConstants';
import { FiredrillClass } from '../models/FiredrillClass';
import { School } from '../models/School';
import { Status } from '../models/Status';
import { Student } from '../models/Student';
import { SchoolUser, UserRole } from '../models/User';
import { ApplicationServices, SchoolServices } from '../platform';
import { buildFiredrillToSave } from '../utils/saveFiredrill';

/**
 * The primary store to organize and update information about fire drills and related classes/students.
 */
export class FiredrillStore {
    @observable private _shouldShowLoadingScreen: boolean = false;

    /**
     * Whether the app should display a loading screen while fetching or cleaning up fire drill information.
     * @public @property {boolean}
     */
    @computed
    get shouldShowLoadingScreen(): boolean {
        return this._shouldShowLoadingScreen;
    }

    @observable private currentUser: SchoolUser;
    @observable private currentFiredrillSchoolID: number | null = null;

    /**
     * The school ID of the active fire drill. Should not be accessed if there is not a fire drill in progress.
     * @public @property {number}
     */
    @computed
    public get activeFiredrillSchoolID(): number {
        if (null == this.currentFiredrillSchoolID) {
            throw new Error('No firedrill is currently active');
        }
        return this.currentFiredrillSchoolID;
    }

    @observable private _school: School | null;

    @observable private _classes: ObservableMap<number, FiredrillClass> = new ObservableMap();

    /**
     * Map of `FiredrillClass` containing all classes for the current fire drill, keyed by class ID.
     * @public @property {Map}
     */
    @computed
    public get classes(): Map<number, FiredrillClass> {
        return this._classes.toJS();
    }

    /**
     * An array of `FiredrillClass` containing all classes for the current fire drill.
     * @public @property {Array}
     */
    @computed
    public get allClasses(): FiredrillClass[] {
        return Array.from(this._classes.values());
    }

    /**
     * An array of `FiredrillClass` containing all classes for the current fire drill that have not been claimed by a
     * staff member.
     * @public @property {Array}
     */
    @computed
    public get unclaimedClasses(): FiredrillClass[] {
        return this.allClasses.filter(c => null == c.claimedByUserID);
    }

    /**
     * An array of `FiredrillClass` containing all classes for the current fire drill that have been claimed by the
     * current user.
     * @public @property {Array}
     */
    @computed
    public get myClasses(): FiredrillClass[] {
        return this.allClasses.filter(c => c.claimedByUserID === this.currentUser.userID);
    }

    /**
     * An array of `Student` containing all students for the current fire drill.
     * @public @property {Array}
     */
    @computed
    public get allStudents(): Student[] {
        return this.allClasses
            .reduce<Student[]>((a, c) => a.concat([...c.students]), [])
            .sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
    }

    /**
     * The total number of students for the current fire drill.
     * @public @property {number}
     */
    @computed
    public get allStudentsCount(): number {
        return this.allStudents.length;
    }

    /**
     * The number of students that are missing for the current fire drill.
     * @public @property {number}
     */
    @computed
    public get missingStudentsCount(): number {
        return this.allStudents.filter(s => s.status === Status.Missing).length;
    }

    /**
     * An array of `SchoolUser` containing all teachers for the current fire drill.
     * @public @property {Array}
     */
    @computed
    public get teachers(): SchoolUser[] {
        return this.allClasses.reduce<SchoolUser[]>((a, c) => a.concat([...c.getTeachers()]), []);
    }

    /**
     * An array of `SchoolUser` containing all non-student users for the current fire drill.
     * @public @property {Array}
     */
    @computed
    public get staff(): SchoolUser[] {
        if (null == this._school) {
            return [];
        }
        return this._school.getStaff();
    }

    private firedrillElapsedTimeTracker: NodeJS.Timer | undefined = undefined;
    @observable private _firedrillElapsedTime: string = '0:00';

    /**
     * The time since the current fire drill started, expressed as Hours:Minutes
     * @public @property {string}
     */
    @computed
    public get firedrillElapsedTime(): string {
        if (true === this.shouldShowLoadingScreen) {
            return '';
        }
        if (false === this.isFiredrillInProgress) {
            return ManageFiredrillStrings.NO_FIREDRILL_ACTIVE;
        }
        return this._firedrillElapsedTime;
    }

    /**
     * Whether the manage fire drill functionality should be shown based on the logged in user's role.
     * @public @property {boolean}
     */
    @computed
    public get shouldShowManage(): boolean {
        return this.currentUser.getUserRole() === UserRole.Principal;
    }

    /**
     * Whether a fire drill is currently in progress for the logged in user's school.
     * @public @property {boolean}
     */
    @computed
    public get isFiredrillInProgress(): boolean {
        return this.currentFiredrillSchoolID != null;
    }

    @observable private _classSearchTerm = '';

    /**
     * The term being used to search classes by name and grade level.
     * @public @property {string}
     */
    @computed
    public get classSearchTerm(): string {
        return this._classSearchTerm;
    }

    /**
     * An array of `FiredrillClass` that match the search value in `classSearchTerm`.
     * @public @property {Array}
     */
    @computed
    public get matchingSearchClasses(): FiredrillClass[] {
        if (this._classSearchTerm.length < 1) {
            return this.allClasses;
        }
        return this.allClasses.filter(aClass =>
            aClass.searchableText.toLowerCase().includes(this._classSearchTerm.toLowerCase())
        );
    }

    @observable private _studentSearchTerm = '';

    /**
     * The term being used to search students by name.
     * @public @property {string}
     */
    @computed
    public get studentSearchTerm(): string {
        return this._studentSearchTerm;
    }

    /**
     * An array of `Student` that matches the search value in `studentSearchTerm`.
     * @public @property {Array}
     */
    @computed
    public get matchingSearchStudents(): Student[] {
        if (this._studentSearchTerm.length < 1) {
            return this.allStudents;
        }
        return this.allStudents.filter(student => student.searchableText.includes(this._studentSearchTerm));
    }

    /**
     * Creates a new `FiredrillStore`.
     */
    public constructor() {
        this.setup();
    }

    /**
     * Sets the value of `classSearchTerm`. Used to update the text for filtering classes.
     * @param {string} term The text to use for filtering classes
     */
    @action
    public setClassSearchTerm(term: string): void {
        this._classSearchTerm = term;
    }

    /**
     * Sets the value of `studentSearchTerm`. Used to update the text for filtering students.
     * @param {string} term The text to use for filtering students
     */
    @action
    public setStudentSearchTerm(term: string): void {
        this._studentSearchTerm = term;
    }

    /**
     * Gets the last name of the user that has claimed the provided class.
     * @param {FiredrillClass} aClass
     * @returns {string} The last name of the user that has claimed the class, or an empty string.
     */
    public getClaimedByNameForClass(aClass: FiredrillClass): string {
        const claimedByUser = this.staff.find(user => user.userID === aClass.claimedByUserID);
        if (null == claimedByUser) {
            return '';
        }

        return claimedByUser.lastName;
    }

    /**
     * Marks the class as claimed by the current logged in user and records it in the database.
     * @param {number} classID
     * @returns {Promise}
     */
    public claimClass(classID: number): Promise<void> {
        return Firebase.Refs.classFiredrillData(this.activeFiredrillSchoolID, classID).update({
            claimedByID: this.currentUser.userID
        });
    }

    /**
     * Marks the class unclaimed by any user and records it in the database.
     * @param {number} classID
     * @returns {Promise}
     */
    public unclaimClass(classID: number): Promise<void> {
        return Firebase.Refs.classFiredrillData(this.activeFiredrillSchoolID, classID).update({
            claimedByID: null
        });
    }

    /**
     * Starts a new fire drill and sends a notification to all users for the provided school ID.
     * @param {number} schoolID
     * @returns {Promise}
     */
    public async initiateFiredrill(schoolID: number): Promise<void> {
        const school = await SchoolServices.getSchool();
        await this.createNewFiredrill(schoolID);
        return ApplicationServices.sendNotification(schoolID, ManageFiredrillStrings.START_NOTIFICATION(school.name));
    }

    /**
     * Ends the current fire drill for the logged in user's school and sends a notification to all users for that
     * school. Also archives data about the current fire drill
     * @returns {Promise}
     */
    public async endFireDrill(): Promise<void> {
        this._shouldShowLoadingScreen = true;
        const school = await SchoolServices.getSchool();

        await ApplicationServices.sendNotification(
            this.activeFiredrillSchoolID,
            ManageFiredrillStrings.END_NOTIFICATION(school.name)
        );
        return this.saveFinishedFiredrill();
    }

    /**
     * Ends the current fire drill for the logged in user's school and sends a notification to all users for that
     * school. Does *not* archive data about the fire drill - all data on this fire drill will be lost.
     * @returns {Promise}
     */
    public async cancelFiredrill(): Promise<void> {
        this._shouldShowLoadingScreen = true;
        const school = await SchoolServices.getSchool();
        await ApplicationServices.sendNotification(
            this.activeFiredrillSchoolID,
            ManageFiredrillStrings.CANCEL_NOTIFICATION(school.name)
        );
        return this.clearActiveFiredrill();
    }

    /**
     * Updates the database with the new status for multiple students.
     * @param {Array} students An array of Students with updated statuses to save in the database.
     * @returns {Promise}
     */
    public async saveStudentsStatuses(students: Student[]): Promise<void> {
        await Promise.all(students.map(student => this.saveStudentStatus(student.userID, student.status)));
    }

    /**
     * Marks a student's status as missing and saves it in the database.
     * @param {number} studentID
     * @returns {Promise}
     */
    public markStudentAsMissiong(studentID: number): Promise<void> {
        return this.saveStudentStatus(studentID, Status.Missing);
    }

    /**
     * Marks a student's status as found and saves it in the database.
     * @param {number} studentID
     * @returns {Promise}
     */
    public markStudentAsFound(studentID: number): Promise<void> {
        return this.saveStudentStatus(studentID, Status.Found);
    }

    /**
     * Marks a student's status as absent and saves it in the database.
     * @param {number} studentID
     * @returns {Promise}
     */
    public markStudentAsAbsent(studentID: number): Promise<void> {
        return this.saveStudentStatus(studentID, Status.Absent);
    }

    @action
    private async setup(): Promise<void> {
        this._shouldShowLoadingScreen = true;
        const user = await ApplicationServices.getCurrentUser();
        this.currentUser = user;
        await Firebase.Auth.signInAnonymouslyAndRetrieveData();
        Firebase.Listeners.activeFiredrillForSchool(user.schoolID, firedrill => {
            if (null != firedrill && null == this.currentFiredrillSchoolID) {
                this.startFiredrill(user.schoolID);
            } else if (null == firedrill && null != this.currentFiredrillSchoolID) {
                this.stopFiredrill();
            } else {
                this._shouldShowLoadingScreen = false;
            }
        });
    }

    private saveStudentStatus(studentID: number, status: Status): Promise<void> {
        return Firebase.Refs.studentFiredrillStatus(this.activeFiredrillSchoolID, studentID).update({ status });
    }

    private createNewFiredrill(schoolID: number): Promise<void> {
        return Firebase.Refs.activeFiredrillForSchool(schoolID).set({
            startTime: Date.now(),
            firedrillID: uuid()
        });
    }

    private async saveFinishedFiredrill(): Promise<void> {
        const firebaseData = await Firebase.Getters.activeFiredrillData(this.activeFiredrillSchoolID);
        if (null == firebaseData || null == this.currentFiredrillSchoolID) {
            this._shouldShowLoadingScreen = false;
            return;
        }
        const firedrillToSave = buildFiredrillToSave(this.currentFiredrillSchoolID, this.allClasses, firebaseData);
        await Firebase.Refs.finishedFiredrillForSchool(this.activeFiredrillSchoolID, firedrillToSave.firedrillID).set(
            firedrillToSave
        );
        this._shouldShowLoadingScreen = false;
        return this.clearActiveFiredrill();
    }

    private clearActiveFiredrill(): Promise<void> {
        this._shouldShowLoadingScreen = false;
        return Firebase.Refs.activeFiredrillForSchool(this.activeFiredrillSchoolID).set(null);
    }

    @action
    private async startFiredrill(firedrillID: number): Promise<void> {
        this._shouldShowLoadingScreen = true;
        this._classes = new ObservableMap();
        this.currentFiredrillSchoolID = firedrillID;
        this.trackFiredrillElapsedTime();
        const [classes, school] = await Promise.all([
            SchoolServices.getClassesForSchool(firedrillID),
            SchoolServices.getSchool()
        ]);
        this._school = school;
        classes.map(c => new FiredrillClass(c)).forEach(c => this._classes.set(c.classID, c));

        this.addFiredrillDataListeners(firedrillID);

        this._shouldShowLoadingScreen = false;
    }

    private addFiredrillDataListeners(firedrillID: number) {
        this.allClasses.forEach(aClass => {
            Firebase.Listeners.classFiredrillData(firedrillID, aClass.classID, handleClassClaimedByChange(aClass));
            aClass.students.forEach(student =>
                Firebase.Listeners.studentFiredrillStatus(
                    firedrillID,
                    student.userID,
                    handleStudentStatusChange(student)
                )
            );
        });
    }

    @action
    private trackFiredrillElapsedTime() {
        this.firedrillElapsedTimeTracker = setInterval(async () => {
            const startTime = await Firebase.Getters.activeFiredrillStartTimeForSchool(this.activeFiredrillSchoolID);
            if (null == startTime) {
                return;
            }
            this._firedrillElapsedTime = moment(Date.now() - startTime).format('m:ss');
        }, 1000);
    }

    @action
    private stopFiredrill(): void {
        this._shouldShowLoadingScreen = true;
        this.allClasses.forEach(aClass => {
            Firebase.Refs.classFiredrillData(this.activeFiredrillSchoolID, aClass.classID).off();
            aClass.students.forEach(student =>
                Firebase.Refs.studentFiredrillStatus(this.activeFiredrillSchoolID, student.userID).off()
            );
        });
        if (null != this.firedrillElapsedTimeTracker) {
            clearInterval(this.firedrillElapsedTimeTracker);
        }
        this._classes = new ObservableMap();
        this.currentFiredrillSchoolID = null;
        this._shouldShowLoadingScreen = false;
    }
}

function handleStudentStatusChange(student: Student): (newStatus: { status: Status } | null) => void {
    return newStatus => {
        if (null == newStatus) {
            return;
        }
        switch (newStatus.status) {
            case Status.Missing:
                student.markAsMissing();
                break;
            case Status.Absent:
                student.markAsAbsent();
                break;
            case Status.Found:
                student.markAsFound();
                break;
            default:
                throw new Error(
                    'Case is unaccounted for @handleStudentStatusChange(), for case: `' +
                        newStatus.status +
                        '`. #FiredrillStore.ts'
                );
        }
    };
}

function handleClassClaimedByChange(aClass: FiredrillClass): (newStatus: { claimedByID: number } | null) => void {
    return newStatus => {
        if (null == newStatus) {
            aClass.unclaim();
        } else {
            aClass.claim(newStatus.claimedByID);
        }
    };
}
