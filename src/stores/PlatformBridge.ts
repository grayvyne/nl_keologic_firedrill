export enum PlatformBridgeCallType {
    OpenPluginsMenu = 'open_plugins_menu',
    ClosePluginsMenu = 'close_plugins_menu',
    TogglePluginsMenu = 'toggle_plugins_menu',
    LogDebugMessage = 'log_debug_message',
    IsAnyoneListening = 'is_anyone_listening'
}

export class PlatformBridge {
    constructor() {
        this.setSelfAsConsoleIfPlugin();
    }

    public makeCall(type: PlatformBridgeCallType, data?: object): Promise<object> {
        this.log('making a call:', name);
        this.postMessage({ type, data });
        return new Promise((resolve, reject) => {
            const handler = (message: MessageEvent) => {
                const messageData = JSON.parse(message.data);
                if (messageData.type === type) {
                    resolve(data);
                    document.removeEventListener('message', handler);
                }
            };
            document.addEventListener('message', handler);
        });
    }

    public log<T>(...message: T[]): void {
        this.postMessage({ type: PlatformBridgeCallType.LogDebugMessage, data: message });
    }

    private postMessage(message: {}): void {
        window.postMessage(JSON.stringify(message), '*');
    }

    private setSelfAsConsoleIfPlugin(): void {
        setTimeout(async () => {
            await this.makeCall(PlatformBridgeCallType.IsAnyoneListening);
        }, 100);
    }
}
