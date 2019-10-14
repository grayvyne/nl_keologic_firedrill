import { ActiveFiredrill } from '../config/firebase';
import { FiredrillClass } from '../models/FiredrillClass';
import { Status } from '../models/Status';
import { Student } from '../models/Student';

interface SavedFiredrill {
    schoolID: number;
    firedrillID: string;
    startTime: number;
    endTime: number;
    Classes: { [classID: number]: SavedFiredrillClass };
}

interface SavedFiredrillClass {
    claimedByID: number | null;
    Students: { [studentID: number]: SavedFiredrillStudent };
}

interface SavedFiredrillStudent {
    status: Status;
}

/**
 * Builds firedrill record object that matches our database model. Returns the object to be sent to the database
 * @param schoolID
 * @param allClasses
 * @param activeFiredrill
 */
export function buildFiredrillToSave(
    schoolID: number,
    allClasses: FiredrillClass[],
    activeFiredrill: ActiveFiredrill
): SavedFiredrill {
    return {
        firedrillID: activeFiredrill.firedrillID,
        startTime: activeFiredrill.startTime,
        endTime: Date.now(),
        schoolID: schoolID,
        Classes: allClasses.reduce(
            (classes, aClass) => ({
                ...classes,
                [aClass.classID]: buildClassToSave(activeFiredrill, aClass)
            }),
            {}
        )
    };
}

function buildClassToSave(firebaseData: ActiveFiredrill, aClass: FiredrillClass): SavedFiredrillClass {
    return {
        claimedByID: getClaimedByIDForClass(firebaseData, aClass),
        Students: aClass.students.reduce(
            (students, student) => ({
                ...students,
                [student.userID]: { status: getStatusForStudent(firebaseData, student) }
            }),
            {}
        )
    };
}

function getClaimedByIDForClass(firebaseData: ActiveFiredrill, aClass: FiredrillClass): number | null {
    if (null != firebaseData.Classes && null != firebaseData.Classes[aClass.classID]) {
        return firebaseData.Classes[aClass.classID].claimedByID || null;
    }
    return aClass.claimedByUserID;
}

function getStatusForStudent(firebaseData: ActiveFiredrill, student: Student): Status {
    if (null == firebaseData.Students || null == firebaseData.Students[student.userID]) {
        return student.status;
    }
    return firebaseData.Students[student.userID].status || student.status;
}
