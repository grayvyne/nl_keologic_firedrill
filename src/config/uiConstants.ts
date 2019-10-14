/**
 * This file holds all of the User Interface text thats used in the application.
 * We keep them in a single file so we can easily find/update text throughout the app
 */

export const pluginName = 'Firedrill';

export const EndFiredrillAlertStrings = {
    TITLE: 'All students have been found. Would you like to end the fire drill?',
    CONFIRM: 'Yes',
    CANCEL: 'No'
};

export const ClassesStrings = {
    YOUR_CLASSES: 'Your Classes',
    FIND_CLASSES: 'Find Classes',
    UNCLAIMED: 'Unclaimed',
    CLAIMED_CLASS: (className: string) => 'Claimed By ' + className,
    UNCLAIMED_CLASS: 'Claim',
    UNCLAIMED_HEADING_NAME: 'Class',
    UNCLAIMED_HEADING_STATUS: 'Status',
    UNCLAIM_TITLE: 'Are you sure you want to mark this class as unclaimed?',
    UNCLAIM_CANCEL: 'CANCEL',
    UNCLAIM_CONFIRM: 'YES'
};

export const RootTabLabels = {
    CLASSES: 'Classes',
    MISSING: 'Missing',
    SEARCH: 'Search',
    CHECKLIST: 'Checklist'
};

export const FindClassesStrings = {
    CLAIMED_CLASS: (lastName: string) => 'Claimed By ' + lastName,
    UNCLAIMED_CLASS: 'Claim',
    SEARCH_PLACEHOLDER: 'Find a Class'
};

export const ClassDetailStrings = {
    SUBMIT_CLASS: 'SUBMIT CLASS',
    CHOOSE_STATUS: 'Choose Status',
    CANCEL: 'CANCEL',
    MODAL_CONFIRM: 'YES',
    CONFIRM_STATUS: 'OK',
    SUBMIT_CLASS_ALERT_TITLE: 'Ready to Submit Class?',
    SUBMIT_CLASS_ALERT_MESSAGE: `Are you finished updating students' statuses?`,
    MISSING: 'Missing',
    ABSENT: 'Absent',
    FOUND: 'Found',
    UNCLAIM: 'UNCLAIM',
    UNLCAIM_CLASS_ALERT: 'Unclaim class?',
    UNCLAIM_CLASS_MESSAGE: 'Are you sure you want to unclaim this class?',
    UNSAVED_CHANGES_ALERT_TITLE:
        'Your progress has not been submitted and won’t be saved. Are you sure you want to go back?',
    UNSAVED_CHANGES_ALERT_MESSAGE:
        'Are you sure you want to go back? Your changes will not be saved if you do not submit.'
};

export const ManageFiredrillStrings = {
    NO_FIREDRILL_ACTIVE: 'No Active Fire Drill',
    START_FIREDRILL: 'Start Fire Drill',
    CANCEL_FIREDRILL: 'Cancel Fire Drill',
    FINISH_FIREDRILL: 'Complete Fire Drill',
    CLOSE: 'Close',
    START_NOTIFICATION: (name: string) => `A firedrill is starting at ${name}`,
    CANCEL_NOTIFICATION: (name: string) => `The fire drill at ${name} has been cancelled`,
    END_NOTIFICATION: (name: string) => `The fire drill at ${name} has ended`
};

export const MyClassesStrings = {
    NO_CLASSES_WARNING: `You've not claimed any classes yet.`,
    FIND_A_CLASS: 'FIND A CLASS'
};

export const ChecklistStrings = {
    TITLE: 'Checklists'
};

export const SearchTabStrings = {
    CHOOSE_STATUS: 'Choose Status',
    CANCEL: 'CANCEL',
    OK: 'OK',
    SEARCH_PLACEHOLDER: 'Find a Student',
    TITLE: 'Student Search'
};

export const MissingStrings = {
    MISSING_STUDENTS_COUNT: (found: number, total: number) => `${found} / ${total} Students Found`,
    HEADING_NAME: 'Name',
    HEADING_STATUS: 'Status',
    MANAGE_BUTTON: 'MANAGE'
};

export const FiredrillIndicatorStrings = {
    NO_FIREDRILL_INDICATOR: `There's no Fire Drill right now.`
};
