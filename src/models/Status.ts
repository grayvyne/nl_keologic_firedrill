export enum Status {
    Missing,
    Absent,
    Found
}

export enum StatusString {
    Missing = 'Missing',
    Absent = 'Absent',
    Found = 'Found'
}

export function statusToString(status: Status): string {
    switch (status) {
        case Status.Missing:
            return StatusString.Missing;
        case Status.Absent:
            return StatusString.Absent;
        case Status.Found:
            return StatusString.Found;
        default:
            throw new Error('Case for status not accounted for @StatusToString');
    }
}

export function stringToStatus(status: string): Status {
    switch (status) {
        case StatusString.Missing:
            return Status.Missing;
        case StatusString.Absent:
            return Status.Absent;
        case StatusString.Found:
            return Status.Found;
        default:
            throw new Error('Case for status not accounted for @StringToStatus');
    }
}
