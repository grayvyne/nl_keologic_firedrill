export enum PlatformBridgeCallType {
    OpenPluginsMenu = 'open_plugins_menu',
    ClosePluginsMenu = 'close_plugins_menu',
    TogglePluginsMenu = 'toggle_plugins_menu',
    LogDebugMessage = 'log_debug_message'
}

export class PlatformBridge {
    public makeCall(name: string): Promise<string> {
        window.postMessage(name, '');
        return new Promise((resolve, reject) => {
            const handler = (message: MessageEvent) => {
                // document.getElementById('message').textContent=JSON.stringify(message.data);
                if (message.data === name) {
                    resolve(name);
                    document.removeEventListener('message', handler);
                }
            };
            document.addEventListener('message', handler);
        });
    }

    public log<T>(...message: T[]): void {
        window.postMessage(JSON.stringify({ type: PlatformBridgeCallType.LogDebugMessage, data: message }), '');
    }
}
