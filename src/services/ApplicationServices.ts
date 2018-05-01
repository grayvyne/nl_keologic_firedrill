import { SchoolUser, SchoolUserRecord } from '../models/User';
import { ApplicationServiceMessageType, PlatformBridge } from '../stores/PlatformBridge';
import { pluginName } from '../config/uiConstants';

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
        await getPlatformBridge().callOverBridge(ApplicationServiceMessageType.TogglePluginsMenu);
    }

    export async function showPluginMenu(): Promise<void> {
        await getPlatformBridge().callOverBridge(ApplicationServiceMessageType.OpenPluginsMenu);
    }

    export async function hidePluginMenu(): Promise<void> {
        await getPlatformBridge().callOverBridge(ApplicationServiceMessageType.ClosePluginsMenu);
    }

    export async function getCurrentUser(): Promise<SchoolUser> {
        const record = await getPlatformBridge().callOverBridge<SchoolUserRecord>(
            ApplicationServiceMessageType.GetCurrentUser
        );
        return new SchoolUser(record);
    }

    export async function sendNotification(schoolID: number, text: string): Promise<void> {
        try {
            await getPlatformBridge().callOverBridge<null | { error: string }>(
                ApplicationServiceMessageType.SendNotification,
                {
                    schoolID,
                    text,
                    pluginName
                }
            );
        } catch (error) {
            alert(error);
        }
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
