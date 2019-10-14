enum BasePlatformMessageType {
    LogDebugMessage = 'application:log_debug_message',
    LogWarningMessage = 'application:log_warning_message',
    LogErrorMessage = 'application:log_error_message',
    IsAnyoneListening = 'application:is_anyone_listening'
}

interface PlatformError {
    error: string;
}

interface BridgeMessage<V, T = BasePlatformMessageType> {
    id: number;
    type: T;
    data?: V | PlatformError;
}

export class PlatformBridge<T> {
    private isReadyToSend: boolean = false;
    private lastSentMessageID: number = 0;
    private queuedMessages: {}[] = [];
    private platformCheckRepeater: NodeJS.Timer | null = null;

    public constructor() {
        this.checkIfPluginMode();
    }

    public callOverBridge<V>(type: T | BasePlatformMessageType, data?: object): Promise<V> {
        const messageID = this.lastSentMessageID;
        this.lastSentMessageID++;
        this.sendWebViewMessage({ type, data, id: messageID });

        return new Promise((resolve, reject) => {
            const handler = (message: MessageEvent) => {
                const messageData: BridgeMessage<V, T> = JSON.parse(message.data);
                if (messageData.type === type && messageData.id === messageID) {
                    if (isPlatformError(messageData.data)) {
                        reject(messageData.data.error);
                    } else {
                        resolve(messageData.data);
                    }
                    document.removeEventListener('message', handler);
                }
            };
            document.addEventListener('message', handler);
        });
    }

    public log(...message: any[]): void {
        this.logMessageToConsoleOrBridge(BasePlatformMessageType.LogDebugMessage, message);
    }

    public logWarning(...message: any[]): void {
        this.logMessageToConsoleOrBridge(BasePlatformMessageType.LogWarningMessage, message);
    }

    public logError(...message: any[]): void {
        this.logMessageToConsoleOrBridge(BasePlatformMessageType.LogErrorMessage, message);
    }

    private logMessageToConsoleOrBridge(type: T | BasePlatformMessageType, message: any[]): void {
        this.callOverBridge(type, message);
        switch (type) {
            case BasePlatformMessageType.LogWarningMessage:
                console.warn(message);
                break;
            case BasePlatformMessageType.LogErrorMessage:
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
            } catch (error) {
                console.error('Error Posting Message:', error, message);
            }
        } else {
            this.queuedMessages.push(message);
        }
    };

    private checkIfPluginMode(): void {
        this.platformCheckRepeater = setInterval(() => {
            window.postMessage(JSON.stringify({ type: BasePlatformMessageType.IsAnyoneListening }), '*');
        }, 250);
        const handler = (message: MessageEvent) => {
            const messageData: BridgeMessage<void, BasePlatformMessageType> = JSON.parse(message.data);
            if (messageData.type === BasePlatformMessageType.IsAnyoneListening) {
                clearInterval(this.platformCheckRepeater!);
                this.isReadyToSend = true;
                this.flushQueue();
                document.removeEventListener('message', handler);
            }
        };
        document.addEventListener('message', handler);
    }

    private flushQueue(): void {
        while (this.queuedMessages.length > 0) {
            this.sendWebViewMessage(this.queuedMessages.pop()!);
        }
    }
}

function isPlatformError<T>(messageData: T | PlatformError): messageData is PlatformError {
    return null != messageData && undefined !== (messageData as PlatformError).error;
}
