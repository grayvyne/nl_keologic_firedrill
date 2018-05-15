/**
 * @module ApplicationServices
 * @exports ApplicationServices
 */

import { pluginName } from '../config/uiConstants';
import { SchoolUser, SchoolUserRecord } from '../models/User';
import { PlatformBridge } from './PlatformBridge';

enum ApplicationServiceMessageType {
    OpenPluginsMenu = 'application:open_plugins_menu',
    ClosePluginsMenu = 'application:close_plugins_menu',
    TogglePluginsMenu = 'application:toggle_plugins_menu',
    GetCurrentUser = 'application:get_current_user',
    SendNotification = 'application:send_notification'
}

let platformBridge: PlatformBridge<ApplicationServiceMessageType> | null = null;

function getPlatformBridge(): PlatformBridge<ApplicationServiceMessageType> {
    if (null == platformBridge) {
        throw new Error('Trying to access bridge before calling init');
    }
    return platformBridge;
}

/**
 * Provides general and platform related functionality such as sending push notifications, showing or hiding the
 * plugins menu, and logging debug information.
 */
export namespace ApplicationServices {
    export function init(bridge: PlatformBridge<ApplicationServiceMessageType>): void {
        platformBridge = bridge;
    }

    /**
     * Toggles the platform's plugins menu open or closed (based on its current position).
     * @returns {void}
     */
    export async function togglePluginMenu(): Promise<void> {
        await getPlatformBridge().callOverBridge(ApplicationServiceMessageType.TogglePluginsMenu);
    }

    /**
     * Shows the platform's plugins menu. Does nothing if the menu is already open.
     * @returns {void}
     */
    export async function showPluginMenu(): Promise<void> {
        await getPlatformBridge().callOverBridge(ApplicationServiceMessageType.OpenPluginsMenu);
    }

    /**
     * Hides the platform's plugins menu. Does nothing if the menu is already closed.
     * @returns {void}
     */
    export async function hidePluginMenu(): Promise<void> {
        await getPlatformBridge().callOverBridge(ApplicationServiceMessageType.ClosePluginsMenu);
    }

    /**
     * Returns a promise containing the user currently logged in to the platform, including their school ID and role.
     * @returns {Promise<SchoolUser>}
     */
    export async function getCurrentUser(): Promise<SchoolUser> {
        const record = await getPlatformBridge().callOverBridge<SchoolUserRecord>(
            ApplicationServiceMessageType.GetCurrentUser
        );
        return new SchoolUser(record);
    }

    /**
     * Asks the platform to create a push notification to all users of a school.
     * @param {number} schoolID the ID of the school to send notifications to.
     * @param {string} text the body of the notification. Can be no longer than 2000 characters.
     * @returns {Promise}
     */
    export async function sendNotification(schoolID: number, text: string): Promise<void> {
        try {
            await getPlatformBridge().callOverBridge<null | { error: string }>(
                ApplicationServiceMessageType.SendNotification,
                {
                    schoolID,
                    text,
                    pluginName: pluginName
                }
            );
        } catch (error) {
            alert(error);
        }
    }

    /**
     * Logs a message to the platform's debug log.
     * @param {any} args the text, numbers, objects, etc. to show in the log.
     * @returns {void}
     */
    export function log(...args: any[]): void {
        getPlatformBridge().log(...args);
    }

    /**
     * Logs a message to the platform's debug log as a warning.
     * @param {any} args the text, numbers, objects, etc. to show in the log.
     * @returns {void}
     */
    export function logWarning(...args: any[]): void {
        getPlatformBridge().logWarning(...args);
    }

    /**
     * Logs a message to the platform's debug log as an error.
     * @param {any} args the text, numbers, objects, etc. to show in the log.
     * @returns {void}
     */
    export function logError(...args: any[]): void {
        getPlatformBridge().logError(...args);
    }
}
