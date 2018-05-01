import { computed, observable } from 'mobx';

export enum ApplicationServiceMessageType {
    OpenPluginsMenu = 'application:open_plugins_menu',
    ClosePluginsMenu = 'application:close_plugins_menu',
    TogglePluginsMenu = 'application:toggle_plugins_menu',
    LogDebugMessage = 'application:log_debug_message',
    LogWarningMessage = 'application:log_warning_message',
    LogErrorMessage = 'application:log_error_message',
    IsAnyoneListening = 'application:is_anyone_listening',
    GetCurrentUser = 'application:get_current_user',
    SendNotification = 'application:send_notification'
}

export enum SchoolServiceMessageType {
    GetAllSchools = 'school:get_all_schools',
    GetAllClasses = 'school:get_all_classes',
    GetAllStudents = 'school:get_all_students',
    GetAllFaculty = 'school:get_all_faculty',
    GetAllUsers = 'school:get_all_users',
    GetSingleSchool = 'school:get_single_school',
    GetSingleClass = 'school:get_single_class',
    GetSingleUser = 'school:get_single_user'
}

type PlatformBridgeMessageType = ApplicationServiceMessageType | SchoolServiceMessageType;

interface PlatformError {
    error: string;
}

interface BridgeMessage<T> {
    id: number;
    type: PlatformBridgeMessageType;
    data?: T | PlatformError;
}

export class PlatformBridge {
    @observable public sendCount = 0;
    @observable public responseCount = 0;
    @computed
    public get numQueuedMessages(): number {
        return this.queuedMessages.length;
    }
    private inPluginMode: boolean;
    private isReadyToSend: boolean = false;
    private lastSentMessageID: number = 0;
    @observable private queuedMessages: {}[] = [];

    public constructor() {
        this.inPluginMode = false;

        setTimeout(async () => {
            this.isReadyToSend = true;

            await this.checkIfPluginMode();
            this.flushQueue();
        }, 1000);
    }

    public callOverBridge<T>(type: PlatformBridgeMessageType, data?: object): Promise<T> {
        const messageID = this.lastSentMessageID;
        this.lastSentMessageID++;
        this.sendWebViewMessage({ type, data, id: messageID });

        return new Promise((resolve, reject) => {
            const handler = (message: MessageEvent) => {
                const messageData: BridgeMessage<T> = JSON.parse(message.data);
                if (messageData.type === type && messageData.id === messageID) {
                    this.responseCount++;
                    if (isNotPlatformError(messageData.data)) {
                        resolve(messageData.data);
                    } else {
                        reject(messageData.data.error);
                    }
                    document.removeEventListener('message', handler);
                }
            };
            document.addEventListener('message', handler);
        });
    }

    public log(...message: any[]): void {
        this.logMessageToConsoleOrBridge(ApplicationServiceMessageType.LogDebugMessage, message);
    }

    public logWarning(...message: any[]): void {
        this.logMessageToConsoleOrBridge(ApplicationServiceMessageType.LogWarningMessage, message);
    }

    public logError(...message: any[]): void {
        this.logMessageToConsoleOrBridge(ApplicationServiceMessageType.LogErrorMessage, message);
    }

    private logMessageToConsoleOrBridge(type: ApplicationServiceMessageType, message: any[]): void {
        this.callOverBridge(type, message);
        switch (type) {
            case ApplicationServiceMessageType.LogWarningMessage:
                console.warn(message);
                break;
            case ApplicationServiceMessageType.LogErrorMessage:
                console.error(message);
                break;
            default:
                console.log(message);
        }
    }

    private sendWebViewMessage = (message: {}): void => {
        if (this.isReadyToSend) {
            try {
                window.postMessage(JSON.stringify(message), '*');
                this.sendCount++;
            } catch (error) {
                console.error('Error Posting Message:', error, message);
            }
        } else {
            this.queuedMessages.push(message);
        }
    };

    private async checkIfPluginMode(): Promise<void> {
        await this.callOverBridge(ApplicationServiceMessageType.IsAnyoneListening);
        this.inPluginMode = true;
        this.log('in plugin mode', this.inPluginMode);
    }

    private flushQueue(): void {
        while (this.queuedMessages.length > 0) {
            this.sendWebViewMessage(this.queuedMessages.pop()!);
        }
    }
}

function isNotPlatformError<T>(messageData: T | PlatformError): messageData is T {
    return null == messageData || undefined === (messageData as PlatformError).error;
}
