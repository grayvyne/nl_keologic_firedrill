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

export namespace Firebase {
    export const Auth = firebase.auth();
    export namespace Refs {
        function allStudentFiredrillStatuses(firedrillID: string): firebase.database.Reference {
            return database.ref('StudentFiredrillStatus').child(firedrillID);
        }

        export function studentFiredrillStatus(firedrillID: string, studentID: number): firebase.database.Reference {
            return allStudentFiredrillStatuses(firedrillID).child(studentID.toString());
        }

        export function addStudentFiredrillStatusListener(
            firedrillID: string,
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
    }
}
