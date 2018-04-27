import { observable, computed, action } from 'mobx';

interface CheckListItem {
    value: string;
    key: string;
}
interface Checklists {
    [name: string]: CheckListItem[];
}

const checklistData: Checklists = {
    Staff: [
        { value: 'Turn off classroom lights', key: 'turn-off-lights' },
        { value: 'Close classroom door when exiting', key: 'close-door' },
        { value: 'Evacuate to pre-determined rally location', key: 'evacuate-to-rally-location' },
        { value: 'Take attendance', key: 'take-attendance' },
        { value: 'Submit attendance to administrative team', key: 'submit-attendance' },
        { value: 'Upon “all-clear” return to class', key: 'return-to-class' }
    ],
    Administration: [
        { value: 'Ensure all occupants have evacuated building', key: 'ensure-evacuation' },
        { value: 'Communicate with maintenance to determine cause of evacuation', key: 'determine-cause' },
        { value: 'Update Superintendent as soon as possible', key: 'update-superintendent' }
    ]
};

export interface StatefulChecklistItem extends CheckListItem {
    completed: boolean;
}

interface StatefulChecklists {
    [name: string]: StatefulChecklistItem[];
}

export class ChecklistStore {
    @observable
    private _checklists: StatefulChecklists = Object.keys(checklistData).reduce(
        (checklists, key) => ({
            ...checklists,
            [key]: checklistData[key].map(item => ({ ...item, completed: false }))
        }),
        {}
    );

    @computed
    public get checklists(): StatefulChecklists {
        return { ...this._checklists };
    }

    public constructor() {
        Object.keys(this._checklists).forEach(this.updateChecklistFromStorage);
    }

    @action
    public setChecklistItemStatus(listName: string, key: string, completed: boolean): void {
        saveChecklistItemStatus(listName, key, completed);
        const checklist = this.checklists[listName];
        if (null == checklist) {
            throw new Error(`No checklist with name ${listName}`);
        }
        const selectedItem = checklist.find(item => item.key === key);
        if (null == selectedItem) {
            throw new Error(`No item with key ${key} in list ${listName}`);
        }
        selectedItem.completed = completed;
    }

    private updateChecklistFromStorage = (name: string): void => {
        const recordedStatuses: {
            [key: string]: boolean;
        } = getChecklistFromStorage(name);
        const checklist = this._checklists[name];
        checklist.map(item => {
            const recordedStatus = recordedStatuses[item.key];
            if (null != recordedStatus) {
                item.completed = recordedStatus;
            }
        });
    };
}
function getChecklistFromStorage(name: string): { [key: string]: boolean } {
    return JSON.parse(localStorage.getItem(getChecklistStorageKey(name)) || '{}');
}

function saveChecklistItemStatus(listName: string, key: string, completed: boolean) {
    const recordedStatuses = getChecklistFromStorage(listName);
    recordedStatuses[key] = completed;
    localStorage.setItem(getChecklistStorageKey(listName), JSON.stringify(recordedStatuses));
}
function getChecklistStorageKey(listName: string): string {
    return 'checklist-' + listName;
}
