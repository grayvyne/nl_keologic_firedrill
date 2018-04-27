import { PlatformBridge } from './PlatformBridge';
import { FiredrillStore } from './FiredrillStore';
import { ChecklistStore } from './ChecklistStore';

interface Stores {
    firedrillStore: FiredrillStore;
    checklistStore: ChecklistStore;
}

export { Stores, PlatformBridge, FiredrillStore, ChecklistStore };
