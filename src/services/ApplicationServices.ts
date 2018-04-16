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

    export async function showPluginMenu(): Promise<void> {
        await getPlatformBridge().makeCall(ApplicationServiceMessageType.OpenPluginsMenu);
    }

    export async function hidePluginMenu(): Promise<void> {
        await getPlatformBridge().makeCall(ApplicationServiceMessageType.ClosePluginsMenu);
    }

    export async function getCurrentUser(): Promise<{}> {
        return getPlatformBridge().makeCall(ApplicationServiceMessageType.GetCurrentUser);
    }

    export function log(...args: any[]): void {
        getPlatformBridge().log(...args);
    }

    export function logWarning(...args: any[]): void {
        getPlatformBridge().logWarning(...args);
    }

    export function logError(...args: any[]): void {
        getPlatformBridge().logError(...args);
    }
}
