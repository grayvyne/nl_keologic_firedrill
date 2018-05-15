/**
 * @module SchoolServices
 * @exports SchoolServices
 */

import { ClassRecord } from '../models/Class';
import { School, SchoolRecord } from '../models/School';
import { Student } from '../models/Student';
import { SchoolUser, SchoolUserRecord } from '../models/User';
import { PlatformBridge } from './PlatformBridge';

enum SchoolServiceMessageType {
    GetAllSchools = 'school:get_all_schools',
    GetAllClasses = 'school:get_all_classes',
    GetAllStudents = 'school:get_all_students',
    GetAllFaculty = 'school:get_all_faculty',
    GetAllUsers = 'school:get_all_users',
    GetSingleSchool = 'school:get_single_school',
    GetSingleClass = 'school:get_single_class',
    GetSingleUser = 'school:get_single_user'
}

let platformBridge: PlatformBridge<SchoolServiceMessageType> | null = null;

function getPlatformBridge(): PlatformBridge<SchoolServiceMessageType> {
    if (null == platformBridge) {
        throw new Error('Trying to access bridge before calling init');
    }
    return platformBridge;
}

/**
 * Provides access to information about the schools, classes, and users related to the user currently logged in to
 * the platform.
 */
export namespace SchoolServices {
    export function init(bridge: PlatformBridge<SchoolServiceMessageType>): void {
        platformBridge = bridge;
    }

    /**
     * Returns a promise containing the user's `School`.
     * @returns {Promise} `Promise` object containg the `School`.
     */
    export async function getSchool(): Promise<School> {
        const schoolRecord = await getPlatformBridge().callOverBridge<SchoolRecord>(
            SchoolServiceMessageType.GetAllSchools
        );
        return new School(schoolRecord);
    }

    /**
     * Returns a promise containing all classes at the user's school.
     * @returns {Promise} `Promise` object containing an array of `ClassRecord`.
     */
    export async function getClasses(): Promise<ClassRecord[]> {
        return getPlatformBridge().callOverBridge<ClassRecord[]>(SchoolServiceMessageType.GetAllClasses);
    }

    /**
     * Returns a promise containing all users at the user's school (including the logged in user).
     * @returns {Promise} `Promise` object containing an array of `SchoolUser`.
     */
    export async function getUsers(): Promise<SchoolUser[]> {
        const userRecords = await getPlatformBridge().callOverBridge<SchoolUserRecord[]>(
            SchoolServiceMessageType.GetAllUsers
        );
        return userRecords.map(record => new SchoolUser(record));
    }

    /**
     * Returns a promise containing all non-student users at the user's school (includes the logged in user if not a
     * student).
     * @returns {Promise} `Promise` object containing an array of `SchoolUser`.
     */
    export async function getFaculty(): Promise<SchoolUser[]> {
        const userRecords = await getPlatformBridge().callOverBridge<SchoolUserRecord[]>(
            SchoolServiceMessageType.GetAllFaculty
        );
        return userRecords.map(record => new SchoolUser(record));
    }

    /**
     * Returns a promise containing all students at the user's school (including the logged in user if they are a
     * student).
     * @returns {Promise} `Promise` object containing an array of `Student`.
     */
    export async function getStudents(): Promise<Student[]> {
        const userRecords = await getPlatformBridge().callOverBridge<SchoolUserRecord[]>(
            SchoolServiceMessageType.GetAllStudents
        );
        return userRecords.map(record => new Student(record));
    }

    /**
     * Returns a promise containing all classes for a desired school.
     * @param {number} schoolID The ID of the school to get classes for.
     * @returns {Promise} `Promise` object containing an array of `ClassRecord`.
     */
    export async function getClassesForSchool(schoolID: number): Promise<ClassRecord[]> {
        const school = await getPlatformBridge().callOverBridge<SchoolRecord>(
            SchoolServiceMessageType.GetSingleSchool,
            {
                id: schoolID
            }
        );
        return school.classes;
    }
}
