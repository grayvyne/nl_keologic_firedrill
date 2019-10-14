import { ChecklistStore } from './ChecklistStore';
import { FiredrillStore } from './FiredrillStore';

interface Stores {
    firedrillStore: FiredrillStore;
    checklistStore: ChecklistStore;
}

export { Stores, FiredrillStore, ChecklistStore };
