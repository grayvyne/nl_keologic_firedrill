import * as firebase from 'firebase';
import { Status } from '../models/Student';

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
const STUDENT_STATUS_NODE_NAME = 'StudentFiredrillStatus';
const CLASSES_NODE_NAME = 'Classes';
const FIREDRILL_START_TIME_NODE_NAME = 'startTime';
const FINISHED_FIREDRILLS_NODE_NAME = 'FinishedFiredrills';

export namespace Firebase {
    export const Auth = firebase.auth();
    export namespace Refs {
        export function studentFiredrillStatus(schoolID: number, studentID: number): firebase.database.Reference {
            return activeFiredrillForSchool(schoolID)
                .child(STUDENT_STATUS_NODE_NAME)
                .child(studentID.toString());
        }

        export function classFiredrillData(schoolID: number, classID: number): firebase.database.Reference {
            return activeFiredrillForSchool(schoolID)
                .child(CLASSES_NODE_NAME)
                .child(classID.toString());
        }

        export function activeFiredrillForSchool(schoolID: number): firebase.database.Reference {
            return database.ref(ACTIVE_FIREDRILLS_NODE_NAME).child(schoolID.toString());
        }

        export function finishedFiredrillForSchool(schoolID: number, firedrillID: string): firebase.database.Reference {
            return database
                .ref(FINISHED_FIREDRILLS_NODE_NAME)
                .child(schoolID.toString())
                .child(firedrillID);
        }
    }

    export namespace Getters {
        export async function activeFiredrillData(schoolID: number): Promise<{ firedrillID: string } | null> {
            const snapshot = await Refs.activeFiredrillForSchool(schoolID).once('value');
            if (null == snapshot) {
                return null;
            }
            return snapshot.val();
        }
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

    export namespace Listeners {
        export function activeFiredrillForSchool(schoolID: number, onChange: (firedrill: {} | null) => void): void {
            Refs.activeFiredrillForSchool(schoolID).on('value', handleNewSnapshot(onChange));
        }

        export function classFiredrillData(
            firedrillID: number,
            classID: number,
            onClaimedByChange: (newStatus: { claimedByID: number } | null) => void
        ): void {
            Refs.classFiredrillData(firedrillID, classID).on('value', handleNewSnapshot(onClaimedByChange));
        }

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
