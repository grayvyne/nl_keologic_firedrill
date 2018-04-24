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

export namespace Firebase {
    export const Auth = firebase.auth();
    export namespace Refs {
        function allStudentFiredrillStatuses(firedrillID: string): firebase.database.Reference {
            return database.ref('StudentFiredrillStatus').child(firedrillID);
        }

        export function studentFiredrillStatus(firedrillID: number, studentID: number): firebase.database.Reference {
            return allStudentFiredrillStatuses(firedrillID.toString()).child(studentID.toString());
        }

        export function addStudentFiredrillStatusListener(
            firedrillID: number,
            studentID: number,
            onStatusChange: (newStatus: { status: Status } | null) => void
        ): void {
            studentFiredrillStatus(firedrillID, studentID).on('value', snapshot => {
                if (snapshot) {
                    onStatusChange(snapshot.val());
                } else {
                    onStatusChange(null);
                }
            });
        }

        export function classFiredrillData(firedrillID: number, classID: number): firebase.database.Reference {
            return database
                .ref('ActiveFiredrills')
                .child(firedrillID.toString())
                .child('Classes')
                .child(classID.toString());
        }

        export function addClassFiredrillClaimedListener(
            firedrillID: number,
            classID: number,
            onStatusChange: (newStatus: { claimedByID: number } | null) => void
        ): void {
            classFiredrillData(firedrillID, classID).on('value', snapshot => {
                if (null != snapshot) {
                    onStatusChange(snapshot.val());
                } else {
                    onStatusChange(null);
                }
            });
        }

        export function acitveFiredrillForSchool(schoolID: number): firebase.database.Reference {
            return database.ref('ActiveFiredrills').child(schoolID.toString());
        }

        export function addActiveFiredrillForSchoolListener(
            schoolID: number,
            onChange: (firedrill: {} | null) => void
        ): void {
            acitveFiredrillForSchool(schoolID).on('value', snapshot => {
                if (null != snapshot) {
                    onChange(snapshot.val());
                } else {
                    onChange(null);
                }
            });
        }
    }
}
