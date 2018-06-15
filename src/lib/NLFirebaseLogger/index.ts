import { auth, database } from 'firebase';

enum LogLevel {
    Info = 'info',
    Debug = 'debug',
    Warning = 'warning',
    Error = 'error'
}

export interface LoggerConfig {
    removeAfterDays: number;
    shouldRemoveOldLogs: boolean;
}

const DEFAULT_CONFIG: LoggerConfig = {
    removeAfterDays: 7,
    shouldRemoveOldLogs: true
};

export class NLFirebaseLogger {
    private static _baseReference: database.Reference | null = null;
    private static config: LoggerConfig = DEFAULT_CONFIG;

    private static get baseReference(): database.Reference {
        if (null == this._baseReference) {
            throw new Error('A firebase reference must be provided with setup() to use the logger');
        }
        return this._baseReference;
    }

    public static setup(baseRef: database.Reference, config: Partial<LoggerConfig>): void {
        this._baseReference = baseRef.child('Logs');
        this.config = { ...DEFAULT_CONFIG, ...config };
    }

    public static async logInfo(...message: any[]): Promise<void> {
        return this.log(LogLevel.Info, ...message);
    }

    public static async logDebug(...message: any[]): Promise<void> {
        return this.log(LogLevel.Debug, ...message);
    }

    public static async logWarning(...message: any[]): Promise<void> {
        return this.log(LogLevel.Warning, ...message);
    }

    public static async logError(...message: any[]): Promise<void> {
        return this.log(LogLevel.Error, ...message);
    }

    private static async log(level: LogLevel, ...message: any[]): Promise<void> {
        await this.removeOldLogs();
        let userID = 'unauthenticated';
        const currentUser = auth().currentUser;
        if (null != currentUser) {
            userID = currentUser.uid;
        }

        const timestamp = Date.now();
        const dateTime = new Date().toISOString();

        return this.getNodeForLog().push({
            level,
            userID,
            timestamp,
            dateTime,
            message: message.join(' ')
        });
    }

    private static async removeOldLogs(): Promise<void> {
        if (false === this.config.shouldRemoveOldLogs) {
            return;
        }

        const lastDateToRemove = new Date();
        lastDateToRemove.setUTCDate(lastDateToRemove.getUTCDate() - this.config.removeAfterDays);

        return this.baseReference
            .orderByKey()
            .startAt('0')
            .endAt(getDateStringKey(lastDateToRemove))
            .once('value', snapshot => {
                const oldLogs = snapshot.val();
                for (const date in oldLogs) {
                    if (oldLogs.hasOwnProperty(date)) {
                        oldLogs[date] = null;
                    }
                }
                this.baseReference.update(oldLogs || {});
            });
    }

    private static getNodeForLog(): database.Reference {
        const now = new Date();
        const dateString = getDateStringKey(now);
        const hourString = now.getUTCHours().toString();
        return this.baseReference.child(dateString).child(hourString);
    }
}

function getDateStringKey(date: Date): string {
    return date.toISOString().substring(0, 10);
}
