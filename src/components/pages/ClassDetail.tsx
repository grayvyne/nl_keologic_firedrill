import BackIcon from '@material-ui/icons/ArrowBack';
import { Button, IconButton, Typography } from 'material-ui';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { ClassDetailStrings as ui } from '../../config/uiConstants';
import { getGradeTitleFromGradeLevel } from '../../models/Class';
import { FiredrillClass } from '../../models/FiredrillClass';
import { Status } from '../../models/Status';
import { Student } from '../../models/Student';
import { Stores } from '../../stores';
import { AppBar, ContentView, StudentTableCell, TableView, UpdateStudentStatusModal } from '../shared';
import { MaterialAlert } from '../shared/NLMaterialModals/MaterialAlert';

namespace styles {
    export const dockedBottomButton: React.CSSProperties = {
        display: 'flex',
        alignSelf: 'stretch',
        height: 80,
        backgroundColor: Colors.POPOVER_DOCK_BG,
        justifyContent: 'center',
        alignItems: 'center'
    };
    export const submitClassButton: React.CSSProperties = {
        height: 50,
        width: '75%',
        backgroundColor: Colors.SUBMIT_CLASS_BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    };
    export const submitClassText: React.CSSProperties = {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    };

    export const navBarTitleContainer: React.CSSProperties = {
        position: 'absolute',
        top: 14,
        left: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    };

    export const navBarTitle: React.CSSProperties = {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    };

    export const navBarSubTitle: React.CSSProperties = { textAlign: 'center', fontWeight: 'bold', fontSize: 10 };
}

interface StoreProps {
    class: FiredrillClass | undefined;
    unclaimClass: () => void;
    submitClass(statusByStudentID: Map<number, Status>): Promise<void>;
}

interface Props extends NavigationScreenProps<{ classID: number }>, StoreProps {}

interface State {
    editStatusModalIsVisible: boolean;
    selectedStudentStatus: Status;
    selectedStudent?: Student;
    showSubmitClassAlert: boolean;
    students: Student[];
    updatedStudentStatusesByStudentId: Map<number, Status>;
    hasMadeChanges: boolean;
    shouldShowUnsavedChangesWarning: boolean;
}

@observer
class ClassDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.assert(
            props.class !== undefined,
            'Class detail was passed in an undefined class in props @constructor in ClassDetail.tsx'
        );

        const studentClass = props.class!;
        const studentStatusMapById: Map<number, Status> = new Map();
        studentClass.students.forEach(student => {
            studentStatusMapById.set(student.userID, student.status);
        });

        this.state = {
            editStatusModalIsVisible: false,
            selectedStudentStatus: Status.Found,
            showSubmitClassAlert: false,
            students: studentClass.students,
            updatedStudentStatusesByStudentId: studentStatusMapById,
            hasMadeChanges: false,
            shouldShowUnsavedChangesWarning: false
        };
    }

    public render(): JSX.Element | null {
        const currentClass = this.props.class;
        if (currentClass === undefined) {
            return null;
        }

        return (
            <div>
                <AppBar>
                    <div style={{ width: 100, justifyContent: 'flex-start' }}>
                        <IconButton color="inherit" aria-label="Menu" onClick={this.warnOnUnsavedChanges}>
                            <BackIcon />
                        </IconButton>
                    </div>
                    <div style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography color="inherit" style={styles.navBarTitle}>
                            {getGradeTitleFromGradeLevel(currentClass.gradeLevel)}
                        </Typography>
                        <Typography color="inherit" style={styles.navBarSubTitle}>
                            {currentClass.getTeachers()[0].lastName}
                        </Typography>
                    </div>

                    <div style={{ width: 100, justifyContent: 'flex-end' }}>
                        <Button color="inherit" onClick={() => this.unclaimClass()} style={{ paddingRight: 20 }}>
                            {ui.UNCLAIM}
                        </Button>
                    </div>
                </AppBar>

                <ContentView>
                    <TableView>{this.state.students.map(this.renderTableCell)}</TableView>
                    <div style={styles.dockedBottomButton}>
                        <Button
                            variant="raised"
                            color="secondary"
                            style={styles.submitClassButton}
                            onClick={() => this.onPressSubmitClass()}
                        >
                            <Typography color="inherit" style={styles.submitClassText}>
                                {ui.SUBMIT_CLASS}
                            </Typography>
                        </Button>
                    </div>
                </ContentView>

                <UpdateStudentStatusModal
                    selectedStudentStatus={
                        null != this.state.selectedStudent
                            ? this.state.updatedStudentStatusesByStudentId.get(this.state.selectedStudent.userID)
                            : undefined
                    }
                    selectedStudent={this.state.selectedStudent}
                    updateStudentMap={this.updateStudentMap}
                    open={this.state.editStatusModalIsVisible}
                    close={() => this.setState({ editStatusModalIsVisible: false })}
                />

                <MaterialAlert
                    alertTitle={ui.SUBMIT_CLASS_ALERT_TITLE}
                    open={this.state.showSubmitClassAlert}
                    onPressCancel={() => this.cancelSubmitClass()}
                    onPressAffirm={() => this.confirmSubmitClass()}
                    affirmButtonLabel={ui.MODAL_CONFIRM}
                    cancelButtonLabel={ui.CANCEL}
                />
                <MaterialAlert
                    alertTitle={ui.UNSAVED_CHANGES_ALERT_TITLE}
                    open={this.state.shouldShowUnsavedChangesWarning}
                    onPressCancel={this.hideUnsavedChangesWarning}
                    onPressAffirm={this.goBackWithUnsavedChanges}
                    affirmButtonLabel={ui.MODAL_CONFIRM}
                    cancelButtonLabel={ui.CANCEL}
                />
            </div>
        );
    }

    private warnOnUnsavedChanges = () => {
        if (this.state.hasMadeChanges) {
            this.setState({ shouldShowUnsavedChangesWarning: true });
        } else {
            this.props.navigation.goBack();
        }
    };

    private hideUnsavedChangesWarning = (): void => this.setState({ shouldShowUnsavedChangesWarning: false });

    private goBackWithUnsavedChanges = (): void => {
        this.hideUnsavedChangesWarning();
        this.props.navigation.goBack();
    };

    private updateStudentMap = (student: Student, status: Status) => {
        const map = this.state.updatedStudentStatusesByStudentId;
        map.set(student.userID, status);
        this.setState({
            hasMadeChanges: true,
            updatedStudentStatusesByStudentId: map,
            editStatusModalIsVisible: false
        });
    };

    private unclaimClass() {
        this.props.unclaimClass();
        this.props.navigation.goBack();
    }

    private cancelSubmitClass = () => {
        this.setState({ showSubmitClassAlert: false });
    };

    private confirmSubmitClass = () => {
        this.saveClassStudentStatuses();
        this.setState({ showSubmitClassAlert: false });
        this.props.navigation.goBack();
    };

    private onPressSubmitClass = () => {
        this.setState({ showSubmitClassAlert: true });
    };

    private saveClassStudentStatuses(): Promise<void> {
        return this.props.submitClass(this.state.updatedStudentStatusesByStudentId);
    }

    private getStatusForStudent(student: Student): Status {
        const status = this.state.updatedStudentStatusesByStudentId.get(student.userID);
        console.assert(
            status !== undefined,
            'Status was not found for user ID @getStatusForStudent in #ClassDetail.tsx'
        );

        return status || Status.Found;
    }

    private showEditStudentStatusModal = (student: Student) => {
        this.setState({ selectedStudent: student, editStatusModalIsVisible: true });
    };

    private renderTableCell = (student: Student): JSX.Element => {
        return (
            <StudentTableCell
                key={student.userID}
                student={student}
                status={this.getStatusForStudent(student)}
                onClick={() => this.showEditStudentStatusModal(student)}
            />
        );
    };
}

function mapStoresToProps({ firedrillStore }: Stores, props: Props): StoreProps {
    console.assert(
        props.navigation.state.params !== undefined,
        'Navigation state paramaters are undefined @mapStoresToProps in #ClassDetails.tsx'
    );

    const classID = props.navigation.state.params!.classID;

    return {
        class: firedrillStore.classes.get(classID),
        unclaimClass: () => firedrillStore.unclaimClass(classID),
        submitClass: statusByStudentID => firedrillStore.submitClass(classID, statusByStudentID)
    };
}

export default inject(mapStoresToProps)(ClassDetail);
