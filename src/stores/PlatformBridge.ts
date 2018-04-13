import { StubConsole } from '../utilities/StubConsole';

export enum ApplicationServiceMessageType {
    OpenPluginsMenu = 'application:open_plugins_menu',
    ClosePluginsMenu = 'application:close_plugins_menu',
    TogglePluginsMenu = 'application:toggle_plugins_menu',
    LogDebugMessage = 'application:log_debug_message',
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

interface BridgeMessage {
    id: number;
    type: PlatformBridgeMessageType;
    data?: {};
}

export class PlatformBridge extends StubConsole {
    constructor() {
        super();
        this.setSelfAsConsoleIfPlugin();
    }

    public makeCall(type: PlatformBridgeMessageType, data?: object): Promise<object> {
        this.log('making a call:', name);
        this.postMessage({ type, data });
        return new Promise((resolve, reject) => {
            const handler = (message: MessageEvent) => {
                const messageData: BridgeMessage = JSON.parse(message.data);
                if (messageData.type === type) {
                    resolve(messageData.data);
                    document.removeEventListener('message', handler);
                }
            };
            document.addEventListener('message', handler);
        });
    }

    public log(...message: any[]): void {
        this.postMessage({ type: ApplicationServiceMessageType.LogDebugMessage, data: message });
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

    private setSelfAsConsoleIfPlugin(): void {
        setTimeout(async () => {
            await this.makeCall(ApplicationServiceMessageType.IsAnyoneListening);
            window.console.log = (...args: any[]) => this.log(...args);
        }, 300);
    }
}
