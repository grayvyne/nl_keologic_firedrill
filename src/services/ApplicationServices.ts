import { PlatformBridge, ApplicationServiceMessageType } from '../stores/PlatformBridge';

let platformBridge: PlatformBridge | null = null;

function getPlatformBridge(): PlatformBridge {
    if (null == platformBridge) {
        throw new Error('Trying to access bridge before calling init');
    }
    return platformBridge;
}

export namespace ApplicationServices {
    export function init(bridge: PlatformBridge): void {
        platformBridge = bridge;
    }

    export async function togglePluginMenu(): Promise<void> {
        await getPlatformBridge().makeCall(ApplicationServiceMessageType.TogglePluginsMenu);
    }

    export async function getCurrentUser(): Promise<{}> {
        return getPlatformBridge().makeCall(ApplicationServiceMessageType.GetCurrentUser);
    }

    export async function log(...args: any[]): Promise<void> {
        await getPlatformBridge().log(...args);
    }
}
