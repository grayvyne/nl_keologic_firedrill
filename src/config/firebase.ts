import * as firebase from 'firebase';
import { Status } from '../models/Status';

const config = {
    apiKey: 'AIzaSyCXmmJo0ZkUwWntEXFqEkZY10HqnapOFpg',
    authDomain: 'keologic-firedrill.firebaseapp.com',
    databaseURL: 'https://keologic-firedrill.firebaseio.com',
    projectId: 'keologic-firedrill',
    storageBucket: 'keologic-firedrill.appspot.com',
    messagingSenderId: '706238500438'
};

firebase.initializeApp(config);

const database = firebase.database();

const ACTIVE_FIREDRILLS_NODE_NAME = 'ActiveFiredrills';
const STUDENT_STATUS_NODE_NAME = 'Students';
const CLASSES_NODE_NAME = 'Classes';
const FIREDRILL_START_TIME_NODE_NAME = 'startTime';
const FINISHED_FIREDRILLS_NODE_NAME = 'FinishedFiredrills';

export namespace Firebase {
    /**
     * Creates a reference to the firebase authentication methods
     */
    export const Auth = firebase.auth();

    /**
     * Container for functions the return refrences to locations in the databbase
     */
    export namespace Refs {
        export function root(): firebase.database.Reference {
            return database.ref();
        }
        /**
         * Refrence to an active firedrill for a student(studentID) within a school(schoolID)
         * @param schoolID
         * @param studentID
         */
        export function studentFiredrillStatus(schoolID: number, studentID: number): firebase.database.Reference {
            return activeFiredrillForSchool(schoolID)
                .child(STUDENT_STATUS_NODE_NAME)
                .child(studentID.toString());
        }

        /**
         * Refrence to an active firedrill for a class(classID) within a school(schoolID)
         * @param schoolID
         * @param classID
         */
        export function classFiredrillData(schoolID: number, classID: number): firebase.database.Reference {
            return activeFiredrillForSchool(schoolID)
                .child(CLASSES_NODE_NAME)
                .child(classID.toString());
        }

        /**
         * Refrence to active firedrills for a school(schoolID)
         * @param schoolID
         */
        export function activeFiredrillForSchool(schoolID: number): firebase.database.Reference {
            return database.ref(ACTIVE_FIREDRILLS_NODE_NAME).child(schoolID.toString());
        }

        /**
         * Refrence to a finished firedrill(firedrillID) records for a school(schoolID)
         * @param schoolID
         * @param firedrillID
         */
        export function finishedFiredrillForSchool(schoolID: number, firedrillID: string): firebase.database.Reference {
            return database
                .ref(FINISHED_FIREDRILLS_NODE_NAME)
                .child(schoolID.toString())
                .child(firedrillID);
        }
    }

    /**
     * Container for functions that return data from the database one time using .once()
     */
    export namespace Getters {
        /**
         * Returns the currently active firedrill data for a school(schoolID)
         * @param schoolID
         */
        export async function activeFiredrillData(schoolID: number): Promise<ActiveFiredrill | null> {
            const snapshot = await Refs.activeFiredrillForSchool(schoolID).once('value');
            if (null == snapshot) {
                return null;
            }
            return snapshot.val();
        }

        /**
         * Returns the time that the currently active firedrill started for a school(schoolID)
         * @param schoolID
         */
        export async function activeFiredrillStartTimeForSchool(schoolID: number): Promise<number | null> {
            const snapshot = await Refs.activeFiredrillForSchool(schoolID)
                .child(FIREDRILL_START_TIME_NODE_NAME)
                .once('value');
            if (null == snapshot) {
                return null;
            }
            return snapshot.val();
        }
    }

    /**
     * Container for the database listeners, once called these functions will fire everytime data changes within their scope
     */
    export namespace Listeners {
        /**
         * Fires the onChange function when ever the currently active firedrill's data updates
         * @param schoolID
         * @param onChange
         */
        export function activeFiredrillForSchool(
            schoolID: number,
            onChange: (firedrill: ActiveFiredrill | null) => void
        ): void {
            Refs.activeFiredrillForSchool(schoolID).on('value', handleNewSnapshot(onChange));
        }

        /**
         * Fires the onClaimedByChange function when ever a class(classID)'s firedrill data updates
         * @param firedrillID
         * @param classID
         * @param onClaimedByChange
         */
        export function classFiredrillData(
            firedrillID: number,
            classID: number,
            onClaimedByChange: (newStatus: { claimedByID: number } | null) => void
        ): void {
            Refs.classFiredrillData(firedrillID, classID).on('value', handleNewSnapshot(onClaimedByChange));
        }

        /**
         * Fires the onStatusChange function when ever a firedrill(firedrillID) status for a student(studentID) is updated
         * @param firedrillID
         * @param studentID
         * @param onStatusChange
         */
        export function studentFiredrillStatus(
            firedrillID: number,
            studentID: number,
            onStatusChange: (newStatus: { status: Status } | null) => void
        ): void {
            Refs.studentFiredrillStatus(firedrillID, studentID).on('value', handleNewSnapshot(onStatusChange));
        }
    }
}

function handleNewSnapshot<T>(
    dataHandler: (data: T | null) => void
): (snapshot: firebase.database.DataSnapshot | null) => void {
    return snapshot => {
        if (snapshot) {
            dataHandler(snapshot.val());
        } else {
            dataHandler(null);
        }
    };
}

export interface ActiveFiredrill {
    firedrillID: string;
    startTime: number;
    Classes?: { [classID: number]: { claimedByID?: number } };
    Students?: { [studentID: number]: { status: Status } };
}
