export const pluginName = 'Firedrill';

export const ClassesStrings = {
    YOUR_CLASSES: 'Your Classes',
    FIND_CLASSES: 'Find Classes',
    UNCLAIMED: 'Unclaimed',
    CLAIMED_CLASS: (className: string) => 'Claimed By ' + className,
    UNCLAIMED_CLASS: 'Claim',
    UNCLAIMED_HEADING_NAME: 'Class',
    UNCLAIMED_HEADING_STATUS: 'Status'
};

export const RootTabLabels = {
    CLASSES: 'Classes',
    MISSING: 'Missing',
    SEARCH: 'Search',
    CHECKLIST: 'Checklist'
};

export const FindClassesStrings = {
    CLAIMED_CLASS: (lastName: string) => 'Claimed By ' + lastName,
    UNCLAIMED_CLASS: 'Claim'
};

export const ClassDetailStrings = {
    SUBMIT_CLASS: 'SUBMIT CLASS',
    CHOOSE_STATUS: 'Choose Status',
    CANCEL: 'CANCEL',
    OK: 'OK',
    SUBMIT_CLASS_ALERT_TITLE: 'Submit Class?',
    SUBMIT_CLASS_ALERT_MESSAGE: `Are you finished updating students' statuses?`,
    MISSING: 'Missing',
    ABSENT: 'Absent',
    FOUND: 'Found',
    UNCLAIM: 'UNCLAIM',
    UNLCAIM_CLASS_ALERT: 'Unclaim class?',
    UNCLAIM_CLASS_MESSAGE: 'Are you sure you want to unclaim this class?'
};

export const ManageFiredrillStrings = {
    NO_FIREDRILL_ACTIVE: 'NO FIREDRILL ACTIVE',
    START_FIREDRILL: 'Start Fire Drill',
    CANCEL_FIREDRILL: 'Cancel Fire Drill',
    FINISH_FIREDRILL: 'End Fire Drill',
    CLOSE: 'Cancel',
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
    OK: 'OK'
};

export const MissingStrings = {
    MISSING_STUDENTS_COUNT: (found: number, total: number) => `${found} / ${total} Students Found`,
    HEADING_NAME: 'Name',
    HEADING_STATUS: 'Status'
};

export const FiredrillIndicatorStrings = {
    NO_FIREDRILL_INDICATOR: `There's no Fire Drill right now.`
};
