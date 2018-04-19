import { ClassRecord } from '../models/Class';
import { School, SchoolRecord } from '../models/School';
import { Student } from '../models/Student';
import { SchoolUser, SchoolUserRecord } from '../models/User';
import { PlatformBridge, SchoolServiceMessageType } from '../stores/PlatformBridge';

let platformBridge: PlatformBridge | null = null;

function getPlatformBridge(): PlatformBridge {
    if (null == platformBridge) {
        throw new Error('Trying to access bridge before calling init');
    }
    return platformBridge;
}

export namespace SchoolServices {
    export function init(bridge: PlatformBridge): void {
        platformBridge = bridge;
    }

    export async function getSchools(): Promise<School[]> {
        const schoolRecords = await getPlatformBridge().makeCall<SchoolRecord[]>(
            SchoolServiceMessageType.GetAllSchools
        );
        return schoolRecords.map(record => new School(record));
    }

    export async function getClasses(): Promise<ClassRecord[]> {
        return getPlatformBridge().makeCall<ClassRecord[]>(SchoolServiceMessageType.GetAllClasses);
    }

    export async function getUsers(): Promise<SchoolUser[]> {
        const userRecords = await getPlatformBridge().makeCall<SchoolUserRecord[]>(
            SchoolServiceMessageType.GetAllUsers
        );
        return userRecords.map(record => new SchoolUser(record));
    }

    export async function getFaculty(): Promise<SchoolUser[]> {
        const userRecords = await getPlatformBridge().makeCall<SchoolUserRecord[]>(
            SchoolServiceMessageType.GetAllFaculty
        );
        return userRecords.map(record => new SchoolUser(record));
    }

    export async function getStudents(): Promise<Student[]> {
        const userRecords = await getPlatformBridge().makeCall<SchoolUserRecord[]>(
            SchoolServiceMessageType.GetAllStudents
        );
        console.log('User Records:', userRecords);
        return userRecords.map(record => new Student(record));
    }
}
