import * as React from 'react';
import { Student } from '../../models/Student';
import { ChangeEvent } from 'react';
import { Status } from '../../models/Status';
import { ClassDetailStrings as ui } from '../../config/uiConstants';
import { MaterialRadioInputList } from '../shared/PopupModals/MaterialRadioInputList';

interface State {
    selectedStudentStatus: Status;
}

interface Props {
    selectedStudent?: Student;
    updateStudentMap: (student: Student, status: Status) => void;
    open: boolean;
    close: () => void;
}

export class UpdateStudentStatusModal extends React.Component<Props, State> {
    public state: State = {
        selectedStudentStatus: Status.Found
    };

    public render(): JSX.Element {
        return (
            <MaterialRadioInputList
                open={this.props.open}
                modalHeader={ui.CHOOSE_STATUS}
                currentlySelectedRadioOptionValue={this.state.selectedStudentStatus}
                radioOptions={[Status.Found, Status.Absent, Status.Missing]}
                onPressRadioOption={this.onPressRadioOption}
                onPressCancel={() => this.props.close()}
                onPressAffirm={() => this.updateStudentStatus()}
                cancelButtonLabel={ui.CANCEL}
                affirmButtonLabel={ui.OK}
            />
        );
    }

    private onPressRadioOption = (event: ChangeEvent<HTMLInputElement>) => {
        const valueString = event.target.value;
        const status = Status[valueString];
        console.assert(
            status !== undefined,
            `event.target.value: "${valueString}" from @onPressRadioOption() in #ClassDetail.tsx doesn't match the Status enum and returned undefined`
        );

        this.setState({ selectedStudentStatus: status });
    };

    private updateStudentStatus = () => {
        const status = this.state.selectedStudentStatus;
        const student = this.props.selectedStudent!;

        this.props.updateStudentMap(student, status);

        this.setState({
            selectedStudentStatus: Status.Found
        });
    };
}
