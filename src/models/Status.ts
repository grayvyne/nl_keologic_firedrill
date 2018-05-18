// NOTE: Its very important that the enum name and the value are equal to eachother.
//       We are using Status[value] to cast from string to Status on some return values

export enum Status {
    Default = 'Default',
    Missing = 'Missing',
    Absent = 'Absent',
    Found = 'Found'
}
