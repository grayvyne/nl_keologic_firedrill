import * as React from 'react';
import { ChangeEvent } from 'react';
import { ClassDetailStrings as ui } from '../../config/uiConstants';
import { Status } from '../../models/Status';
import { Student } from '../../models/Student';
import { MaterialRadioInputList } from '../shared/NLMaterialModals/MaterialRadioInputList';
import { Colors } from '../../config/materialUiTheme';

interface State {
    selectedStudentStatus: Status;
}

interface Props {
    selectedStudentStatus?: Status;
    selectedStudent?: Student;
    updateStudentMap: (student: Student, status: Status) => void;
    open: boolean;
    close: () => void;
}

/**
 * This is the modal that shows up when you're trying to update a students status
 * Its used in multiple places throughout the app, so we put the bulk of the functionality into a shared component
 */
export default class UpdateStudentStatusModal extends React.Component<Props, State> {
    public state: State = {
        selectedStudentStatus: this.props.selectedStudentStatus || Status.Found
    };

    componentWillReceiveProps(nextProps: Props) {
        if (
            null != nextProps.selectedStudentStatus &&
            nextProps.selectedStudentStatus !== this.props.selectedStudentStatus
        ) {
            this.setState({ selectedStudentStatus: nextProps.selectedStudentStatus });
        }
    }

    public render(): JSX.Element {
        return (
            <MaterialRadioInputList
                open={this.props.open}
                modalHeader={ui.CHOOSE_STATUS}
                currentlySelectedRadioOptionValue={this.state.selectedStudentStatus}
                radioOptions={[
                    { value: Status.Found, color: Colors.FOUND_BUTTON },
                    { value: Status.Absent, color: Colors.ABSENT_BUTTON },
                    { value: Status.Missing, color: Colors.MISSING_BUTTON }
                ]}
                onPressRadioOption={this.onPressRadioOption}
                onPressCancel={() => this.props.close()}
                onPressAffirm={() => this.updateStudentStatus()}
                cancelButtonLabel={ui.CANCEL}
                affirmButtonLabel={ui.CONFIRM_STATUS}
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
