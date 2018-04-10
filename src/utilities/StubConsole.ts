export class StubConsole implements Console {
    memory: any;
    Console: NodeJS.ConsoleConstructor;
    disableYellowBox: boolean;
    ignoredYellowBox: string[];
    assert(condition?: boolean | undefined, message?: string | undefined, ...data: any[]): void;
    assert(value: any, message?: string | undefined, ...optionalParams: any[]): void;
    assert(value?: any, message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    clear(): void {
        throw new Error('Method not implemented.');
    }
    count(label?: string | undefined): void {
        throw new Error('Method not implemented.');
    }
    debug(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    dir(value?: any, ...optionalParams: any[]): void;
    dir(obj: any, options?: NodeJS.InspectOptions | undefined): void;
    dir(obj?: any, options?: any, ...rest: any[]) {
        throw new Error('Method not implemented.');
    }
    dirxml(value: any): void {
        throw new Error('Method not implemented.');
    }
    error(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    exception(message?: string | undefined, ...optionalParams: any[]): void {
        throw new Error('Method not implemented.');
    }
    group(groupTitle?: string | undefined, ...optionalParams: any[]): void {
        throw new Error('Method not implemented.');
    }
    groupCollapsed(groupTitle?: string | undefined, ...optionalParams: any[]): void {
        throw new Error('Method not implemented.');
    }
    groupEnd(): void {
        throw new Error('Method not implemented.');
    }
    info(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    log(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    markTimeline(label?: string | undefined): void {
        throw new Error('Method not implemented.');
    }
    msIsIndependentlyComposed(element: Element): boolean {
        throw new Error('Method not implemented.');
    }
    profile(reportName?: string | undefined): void {
        throw new Error('Method not implemented.');
    }
    profileEnd(): void {
        throw new Error('Method not implemented.');
    }
    select(element: Element): void {
        throw new Error('Method not implemented.');
    }
    table(...tabularData: any[]): void;
    table(...data: any[]): void;
    table(...data: any[]) {
        throw new Error('Method not implemented.');
    }
    time(label?: string | undefined): void;
    time(label: string): void;
    time(label?: any) {
        throw new Error('Method not implemented.');
    }
    timeEnd(label?: string | undefined): void;
    timeEnd(label: string): void;
    timeEnd(label?: any) {
        throw new Error('Method not implemented.');
    }
    timeStamp(label?: string | undefined): void {
        throw new Error('Method not implemented.');
    }
    timeline(label?: string | undefined): void {
        throw new Error('Method not implemented.');
    }
    timelineEnd(label?: string | undefined): void {
        throw new Error('Method not implemented.');
    }
    trace(message?: any, ...optionalParams: any[]): void;
    trace(message?: any, ...optionalParams: any[]): void;
    trace(message?: any, ...optionalParams: any[]): void;
    trace(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    warn(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
}
