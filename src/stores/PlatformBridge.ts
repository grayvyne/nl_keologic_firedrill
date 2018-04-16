import { StubConsole } from '../utilities/StubConsole';

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

interface BridgeMessage<T> {
    id: number;
    type: PlatformBridgeMessageType;
    data?: T;
}

export class PlatformBridge extends StubConsole {
    private inPluginMode: boolean;

    constructor() {
        super();
        this.inPluginMode = false;
        this.checkIfPluginMode();
    }

    public makeCall<T>(type: PlatformBridgeMessageType, data?: object): Promise<T> {
        this.log('making a call: type:', type, 'data:', data);
        this.postMessage({ type, data });
        return new Promise((resolve, reject) => {
            const handler = (message: MessageEvent) => {
                const messageData: BridgeMessage<T> = JSON.parse(message.data);
                if (messageData.type === type) {
                    resolve(messageData.data);
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
        if (this.inPluginMode) {
            return this.postMessage({ type, data: message });
        }
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

    private postMessage(message: {}): void {
        try {
            window.postMessage(JSON.stringify(message), '*');
        } catch (error) {
            const element = document.createElement('pre');
            element.innerHTML = JSON.stringify(error);
            document.body.appendChild(element);
        }
    }

    private checkIfPluginMode(): void {
        setTimeout(async () => {
            await this.makeCall(ApplicationServiceMessageType.IsAnyoneListening);
            this.inPluginMode = true;
        }, 300);
    }
}
