export enum PlatformBridgeCallType {
    OpenPluginsMenu = 'open_plugins_menu',
    ClosePluginsMenu = 'close_plugins_menu',
    TogglePluginsMenu = 'toggle_plugins_menu',
    LogDebugMessage = 'log_debug_message',
    IsAnyoneListening = 'is_anyone_listening'
}

export class PlatformBridge {
    public constructor() {
        this.setSelfAsConsoleIfPlugin();
    }

    public callOverBridge(type: PlatformBridgeCallType, data?: object): Promise<object> {
        this.log('making a call:', name);
        this.sendWebViewMessage({ type, data });
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
        this.sendWebViewMessage({ type: PlatformBridgeCallType.LogDebugMessage, data: message });
    }

    private sendWebViewMessage(message: {}): void {
        window.postMessage(JSON.stringify(message), '*');
    }

    private setSelfAsConsoleIfPlugin(): void {
        setTimeout(async () => {
            await this.callOverBridge(PlatformBridgeCallType.IsAnyoneListening);
        }, 100);
    }
}
