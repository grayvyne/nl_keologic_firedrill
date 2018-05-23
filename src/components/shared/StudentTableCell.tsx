import { observer } from 'mobx-react';
import * as React from 'react';
import { Colors } from '../../config/materialUiTheme';
import { ClassDetailStrings } from '../../config/uiConstants';
import { Status } from '../../models/Status';
import { Student } from '../../models/Student';
import ActionTableCell from './ActionTableCell';

interface Props {
    student: Student;
    status: Status;
    onClick(): void;
}

/**
 * This is an action table cell that is given properties specific to a student table cell
 */
@observer
export default class StudentTableCell extends React.Component<Props> {
    public render(): JSX.Element {
        const cellProps = this.buildTableCellProps(this.props.status);

        return (
            <ActionTableCell
                key={this.props.student.userID}
                cellData={{
                    id: this.props.student.userID,
                    label: this.props.student.firstName + ' ' + this.props.student.lastName
                }}
                buttonTextColor={Colors.CLASS_BUTTON_TEXT}
                {...cellProps}
                onClick={this.props.onClick}
            />
        );
    }

    private buildTableCellProps(status: Status): {} {
        switch (status) {
            case Status.Missing:
                return { buttonLabel: ClassDetailStrings.MISSING, buttonColor: Colors.MISSING_BUTTON };
            case Status.Absent:
                return { buttonLabel: ClassDetailStrings.ABSENT, buttonColor: Colors.ABSENT_BUTTON };
            case Status.Default:
            case Status.Found:
                return { buttonLabel: ClassDetailStrings.FOUND, buttonColor: Colors.FOUND_BUTTON };
            default:
                throw new Error('Case unaccounted for: `' + status + '`, @buildTableCellProps #StudentTableCell.tsx');
        }
    }
}
