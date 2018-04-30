export const pluginName = 'Firedrill';

export const ClassTabStrings = {
    YOUR_CLASSES: 'Your Classes',
    FIND_CLASSES: 'Find Classes',
    UNCLAIMED: 'Unclaimed'
};

export const RootTabLabels = {
    CLASSES: 'Classes',
    MISSING: 'Missing',
    SEARCH: 'Search',
    CHECKLIST: 'Checklist'
};

export const FindClassesStrings = {
    CLAIMED_CLASS: (className: string) => 'Claimed By ' + className,
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
    FOUND: 'Found'
};

export const ManageFiredrillStrings = {
    START_FIREDRILL: 'Start Fire Drill',
    CANCEL_FIREDRILL: 'Cancel Fire Drill',
    FINISH_FIREDRILL: 'End Fire Drill',
    CLOSE: 'Cancel',
    START_NOTIFICATION: (name: string) => `A firedrill is starting at ${name}`,
    CANCEL_NOTIFICATION: (name: string) => `The fire drill at ${name} has been cancelled`,
    END_NOTIFICATION: (name: string) => `The fire drill at ${name} has ended`
};

export const ChecklistStrings = {
    TITLE: 'Checklists'
};

export const MissingStrings = {
    MISSING_STUDENTS_COUNT: (found: number, total: number) => `${found} / ${total} Students Found`
};
