import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import { Button, IconButton, LinearProgress, Typography } from 'material-ui';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject } from 'mobx-react';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { ManageFiredrillStrings, MissingStrings } from '../../config/uiConstants';
import { Status } from '../../models/Status';
import { Student } from '../../models/Student';
import { ApplicationServices } from '../../platform';
import { Stores } from '../../stores';
import {
    AppBar,
    ContentView,
    NoFiredrillIndicator,
    StudentTableCell,
    TableHeader,
    TableView,
    UpdateStudentStatusModal
} from '../shared';
import { SharedDialogContainer } from '../shared/NLMaterialModals/SharedDialogContainer';

interface Props {
    students: Student[];
    totalStudentsCount: number;
    foundStudentsCount: number;
    firedrillElapsedTime: string;
    shouldShowManage: boolean;
    isFiredrillInProgress: boolean;
    initiateFireDrill(schoolID: number): Promise<void>;
    endFireDrill(): Promise<void>;
    cancelFireDrill(): Promise<void>;
    markStudentAbsent(id: number): void;
    markStudentMissing(id: number): void;
    markStudentFound(id: number): void;
}

interface State {
    isManageModalOpen: boolean;
    isStudentStatusModalOpen: boolean;
    selectedStudent?: Student;
}

namespace styles {
    export const personIconStyle: React.CSSProperties = {
        height: 26,
        width: 26
    };
    export const titleContainer: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
    };
    export const missingBarContainer: React.CSSProperties = {
        justifyContent: 'center',
        alignItems: 'center'
    };
    export const missingBar: React.CSSProperties = { height: 40, alignSelf: 'stretch', flex: 1 };
    export const missingText: React.CSSProperties = { position: 'absolute', color: Colors.BACKGROUND };
    export const manageButton: React.CSSProperties = { margin: 20 };
    export const manageButtonPadding = { paddingRight: 20 };
    export const manageButtonContainer: React.CSSProperties = {
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'stretch',
        padding: 10
    };
}

/**
 * This page renders a list of students that are missing
 * It contains a search bar to search through the list of missing students
 * It also contains a progress bar showing the status of all the students that fills to full when all students' statuses are Found or Absent
 * It will be hidden by a "No Firedrill Active" indicator when there is no firedrill going on
 * You can also update a students status through functionality on the rendered table cell
 * There is a hidden button: "Manage". This is only shown to users with the principle role. This allows the user to start/cancel/end a firedrill.
 */
class Missing extends React.Component<Props, State> {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused }) => {
            return (
                <PersonIcon
                    style={{
                        ...styles.personIconStyle,
                        ...{ color: focused ? blueGrey[800] : Colors.DISABLED_TAB_ICON }
                    }}
                />
            );
        }
    };

    public state: State = { isManageModalOpen: false, isStudentStatusModalOpen: false };

    public render(): JSX.Element {
        return (
            <div>
                <AppBar position={'absolute'}>
                    <IconButton onClick={ApplicationServices.togglePluginMenu} color="inherit" aria-label="Menu">
                        <AppsIcon />
                    </IconButton>
                    <div style={styles.titleContainer}>
                        <Typography
                            variant={
                                this.props.firedrillElapsedTime === ManageFiredrillStrings.NO_FIREDRILL_ACTIVE
                                    ? 'caption'
                                    : 'title'
                            }
                            color="inherit"
                        >
                            {this.props.firedrillElapsedTime}
                        </Typography>
                    </div>
                    {this.props.shouldShowManage && (
                        <Button
                            color="inherit"
                            style={styles.manageButtonPadding}
                            onClick={() => this.setState({ isManageModalOpen: true })}
                        >
                            {MissingStrings.MANAGE_BUTTON}
                        </Button>
                    )}
                </AppBar>
                <NoFiredrillIndicator>
                    <ContentView>
                        <div style={styles.missingBarContainer}>
                            <LinearProgress
                                variant="determinate"
                                value={this.props.foundStudentsCount / this.props.totalStudentsCount * 100}
                                style={styles.missingBar}
                                color="secondary"
                            />
                            <Typography variant="subheading" style={styles.missingText}>
                                {MissingStrings.MISSING_STUDENTS_COUNT(
                                    this.props.foundStudentsCount,
                                    this.props.totalStudentsCount
                                )}
                            </Typography>
                        </div>
                        <TableHeader>
                            <Typography variant="display1">{MissingStrings.HEADING_NAME}</Typography>
                            <Typography variant="display1">{MissingStrings.HEADING_STATUS}</Typography>
                        </TableHeader>
                        <TableView>
                            {this.props.students.map(student => (
                                <StudentTableCell
                                    key={student.userID}
                                    student={student}
                                    status={student.status}
                                    onClick={() => {
                                        this.setState({ selectedStudent: student, isStudentStatusModalOpen: true });
                                        return;
                                    }}
                                />
                            ))}
                        </TableView>
                    </ContentView>
                </NoFiredrillIndicator>
                <UpdateStudentStatusModal
                    selectedStudent={this.state.selectedStudent}
                    updateStudentMap={this.markStudentAs}
                    open={this.state.isStudentStatusModalOpen}
                    close={() => this.setState({ isStudentStatusModalOpen: false })}
                />

                {this.props.shouldShowManage && (
                    <SharedDialogContainer open={this.state.isManageModalOpen}>
                        <div style={styles.manageButtonContainer}>
                            <Button
                                style={styles.manageButton}
                                variant="raised"
                                color="secondary"
                                onClick={this.handleStartFireDrillClick}
                                disabled={this.props.isFiredrillInProgress}
                            >
                                {ManageFiredrillStrings.START_FIREDRILL}
                            </Button>
                            <Button
                                style={styles.manageButton}
                                variant="raised"
                                color="primary"
                                onClick={this.handleEndFireDrillClick}
                                disabled={false === this.props.isFiredrillInProgress}
                            >
                                {ManageFiredrillStrings.FINISH_FIREDRILL}
                            </Button>
                            <Button
                                style={styles.manageButton}
                                variant="raised"
                                color="primary"
                                onClick={this.handleCancelFireDrillClick}
                                disabled={false === this.props.isFiredrillInProgress}
                            >
                                {ManageFiredrillStrings.CANCEL_FIREDRILL}
                            </Button>
                            <Button style={styles.manageButton} onClick={this.closeManageModal}>
                                {ManageFiredrillStrings.CLOSE}
                            </Button>
                        </div>
                    </SharedDialogContainer>
                )}
            </div>
        );
    }

    private markStudentAs = (student: Student, status: Status) => {
        switch (status) {
            case Status.Missing:
                this.props.markStudentMissing(student.userID);
                break;
            case Status.Found:
                this.props.markStudentFound(student.userID);
                break;
            case Status.Absent:
                this.props.markStudentAbsent(student.userID);
                break;
            default:
                throw new Error('Case unaccounted for @updateStudentStatus #ClassDetail.tsx');
        }

        this.setState({ isStudentStatusModalOpen: false });
    };

    private closeManageModal = () => this.setState({ isManageModalOpen: false });

    private handleStartFireDrillClick = () => {
        this.props.initiateFireDrill(1);
        this.closeManageModal();
    };

    private handleCancelFireDrillClick = () => {
        this.props.cancelFireDrill();
        this.closeManageModal();
    };

    private handleEndFireDrillClick = () => {
        this.props.endFireDrill();
        this.closeManageModal();
    };
}

function mapStoresToProps({ firedrillStore }: Stores): Props {
    return {
        students: firedrillStore.allStudents.filter(student => student.status === Status.Missing),
        totalStudentsCount: firedrillStore.allStudentsCount,
        foundStudentsCount: firedrillStore.allStudentsCount - firedrillStore.missingStudentsCount,
        firedrillElapsedTime: firedrillStore.firedrillElapsedTime,
        shouldShowManage: firedrillStore.shouldShowManage,
        isFiredrillInProgress: firedrillStore.isFiredrillInProgress,
        initiateFireDrill: schoolID => firedrillStore.initiateFiredrill(schoolID),
        endFireDrill: () => firedrillStore.endFireDrill(),
        cancelFireDrill: () => firedrillStore.cancelFiredrill(),
        markStudentAbsent: (id: number) => firedrillStore.markStudentAsAbsent(id),
        markStudentMissing: (id: number) => firedrillStore.markStudentAsMissiong(id),
        markStudentFound: (id: number) => firedrillStore.markStudentAsFound(id)
    };
}

export default inject(mapStoresToProps)(Missing);
