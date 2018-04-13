import { PlatformBridge, SchoolServiceMessageType } from '../stores/PlatformBridge';
import { SchoolRecord, School } from '../models/School';

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
        const schoolRecords = await getPlatformBridge().makeCall(SchoolServiceMessageType.GetAllSchools);
        return (schoolRecords as SchoolRecord[]).map(record => new School(record));
    }

    export async function getClasses(): Promise<{}> {
        return getPlatformBridge().makeCall(SchoolServiceMessageType.GetAllClasses);
    }

    export async function getFaculty(): Promise<{}> {
        return getPlatformBridge().makeCall(SchoolServiceMessageType.GetAllFaculty);
    }

    export async function getStudents(): Promise<{}> {
        return getPlatformBridge().makeCall(SchoolServiceMessageType.GetAllStudents);
    }
}
