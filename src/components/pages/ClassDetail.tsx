import { IconButton, Toolbar } from 'material-ui';
import { ScrollView, View, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import BackIcon from '@material-ui/icons/ArrowBack';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import ContentView from '../shared/ContentView';
import TableView from '../shared/TableView';
import { FiredrillClass } from '../../models/FiredrillClass';
import { Stores } from '../../stores';
import { inject, observer } from 'mobx-react';
import { ActionTableCell } from '../shared';
import { Student } from '../../models/Student';
import { CSSProperties, ChangeEvent } from 'react';
import { Status } from '../../models/Status';
import { ClassDetailStrings as ui } from '../../config/uiConstants';
import { Colors } from '../../config/materialUiTheme';
import { MaterialRadioInputList } from '../shared/PopupModals/MaterialRadioInputList';
import { MaterialAlert } from '../shared/PopupModals/MaterialAlert';
import { getGradeTitleFromGradeLevel } from '../../models/Class';

namespace styles {
    export const hideBoxShadow = { boxShadow: 'none' };
    export const iconButton: CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const tableViewContainer = { paddingBottom: 150 };
    export const dockedBottomButton: ViewStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 80,
        backgroundColor: Colors.POPOVER_DOCK_BG,
        justifyContent: 'center',
        alignItems: 'center'
    };
    export const containerBackground = { backgroundColor: 'white' };
    export const stretchItems = { alignItems: 'stretch' };
    export const submitClassButton: ViewStyle = {
        height: 50,
        width: '75%',
        backgroundColor: Colors.SUBMIT_CLASS_BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    };
    export const submitClassText: TextStyle = {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    };

    export const buttonTextColor = 'white';
}

interface StoreProps {
    class: FiredrillClass | undefined;
    saveStudentsStatuses: (students: Student[]) => void;
    unclaimClass: () => void;
}

interface Props extends NavigationScreenProps<{ classID: number }>, StoreProps {}

interface State {
    editStatusModalIsVisible: boolean;
    selectedStudentStatus: Status;
    selectedStudent?: Student;
    showSubmitClassAlert: boolean;
    students: Student[];
    updatedStudentStatusesByStudentId: Map<number, Status>;
    showUnclaimClassAlert: boolean;
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
            showUnclaimClassAlert: false
        };
    }

    public render(): JSX.Element | null {
        const currentClass = this.props.class;
        if (currentClass === undefined) {
            return null;
        }

        return (
            <View style={styles.containerBackground}>
                <AppBar position={'fixed'} style={styles.hideBoxShadow}>
                    <Toolbar style={styles.stretchItems}>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            style={styles.iconButton}
                            onClick={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <BackIcon />
                        </IconButton>
                        <View style={{ flex: 1 }} />
                        <View
                            style={{
                                position: 'absolute',
                                top: 14,
                                left: 0,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}
                            >
                                {getGradeTitleFromGradeLevel(currentClass.gradeLevel)}
                            </Text>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 10 }}>
                                {currentClass.getTeachers()[0].lastName}
                            </Text>
                        </View>

                        <View style={{ height: '100%', width: 100, alignSelf: 'center', marginRight: -10 }}>
                            <TouchableOpacity onPress={() => this.showUnclaimClassAlert()}>
                                <Text style={{ textAlign: 'center', fontSize: 14 }}>{'UNCLAIM'}</Text>
                            </TouchableOpacity>
                        </View>
                    </Toolbar>
                </AppBar>

                <ContentView>
                    <ScrollView>
                        <TableView style={styles.tableViewContainer}>
                            {this.state.students.map(this.renderTableCell)}
                        </TableView>
                    </ScrollView>
                    <View style={styles.dockedBottomButton}>
                        <TouchableOpacity style={styles.submitClassButton} onPress={() => this.onPressSubmitClass()}>
                            <Text style={styles.submitClassText}>{ui.SUBMIT_CLASS}</Text>
                        </TouchableOpacity>
                    </View>
                </ContentView>

                <MaterialRadioInputList
                    open={this.state.editStatusModalIsVisible}
                    modalHeader={ui.CHOOSE_STATUS}
                    currentlySelectedRadioOptionValue={this.state.selectedStudentStatus}
                    radioOptions={[Status.Found, Status.Absent, Status.Missing]}
                    onPressRadioOption={this.onPressRadioOption}
                    onPressCancel={() => this.cancelUpdateStudentStatus()}
                    onPressAffirm={() => this.updateStudentStatus()}
                    cancelButtonLabel={ui.CANCEL}
                    affirmButtonLabel={ui.OK}
                />

                <MaterialAlert
                    alertTitle={ui.SUBMIT_CLASS_ALERT_TITLE}
                    alertMessage={ui.SUBMIT_CLASS_ALERT_MESSAGE}
                    open={this.state.showSubmitClassAlert}
                    onPressCancel={() => this.cancelSubmitClass()}
                    onPressAffirm={() => this.confirmSubmitClass()}
                    affirmButtonLabel={ui.OK}
                    cancelButtonLabel={ui.CANCEL}
                />

                <MaterialAlert
                    alertTitle={'Unclaim class?'}
                    alertMessage={'Are you sure you want to unclaim this class?'}
                    open={this.state.showUnclaimClassAlert}
                    onPressCancel={() => this.cancelUnclaimClass()}
                    onPressAffirm={() => this.confirmUnclaimClass()}
                    affirmButtonLabel={ui.OK}
                    cancelButtonLabel={ui.CANCEL}
                />
            </View>
        );
    }

    private showUnclaimClassAlert() {
        this.setState({ showUnclaimClassAlert: true });
    }

    private cancelUnclaimClass() {
        this.setState({ showUnclaimClassAlert: false });
    }

    private confirmUnclaimClass() {
        this.props.unclaimClass();
        this.setState({ showUnclaimClassAlert: false });
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

    private saveClassStudentStatuses(): void {
        const updatedStudents = [...this.state.students];

        this.state.updatedStudentStatusesByStudentId.forEach((status, id) => {
            const studentToUpdate = updatedStudents.find(s => s.userID === id);
            if (studentToUpdate === undefined) {
                throw Error(
                    'this.state.students: Student[] does not contain a reference to this.updatedStudentStatusesByStudentId()'
                );
            }

            switch (status) {
                case Status.Missing:
                    studentToUpdate.markAsMissing();
                    break;
                case Status.Found:
                    studentToUpdate.markAsFound();
                    break;
                case Status.Absent:
                    studentToUpdate.markAsAbsent();
                    break;
                default:
                    throw new Error('Case unaccounted for @updateStudentStatus #ClassDetail.tsx');
            }
        });

        this.props.saveStudentsStatuses(updatedStudents);
    }

    private cancelUpdateStudentStatus = () => {
        this.setState({ editStatusModalIsVisible: false });
    };

    private updateStudentStatus = () => {
        const updatedStatus = this.state.selectedStudentStatus;
        const selectedStudent = this.state.selectedStudent!;

        const map = this.state.updatedStudentStatusesByStudentId;
        map.set(selectedStudent.userID, updatedStatus);

        this.setState({
            editStatusModalIsVisible: false,
            selectedStudentStatus: Status.Found,
            selectedStudent: undefined,
            updatedStudentStatusesByStudentId: map
        });
    };

    private getStatusForStudent(student: Student): Status {
        const status = this.state.updatedStudentStatusesByStudentId.get(student.userID);
        console.assert(
            status !== undefined,
            'Status was not found for user ID @getStatusForStudent in #ClassDetail.tsx'
        );

        return status || Status.Found;
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

    private showEditStudentStatusModal = (student: Student) => {
        this.setState({ selectedStudent: student, editStatusModalIsVisible: true });
    };

    private renderTableCell = (student: Student): JSX.Element => {
        const cellProps = this.buildTableCellProps(student);

        return (
            <ActionTableCell
                key={student.userID}
                cellData={{ id: student.userID, label: student.firstName + ' ' + student.lastName }}
                buttonTextColor={styles.buttonTextColor}
                {...cellProps}
                onClick={() => this.showEditStudentStatusModal(student)}
            />
        );
    };

    private buildTableCellProps(student: Student): {} {
        const status = this.getStatusForStudent(student);

        switch (status) {
            case Status.Missing:
                return { buttonLabel: ui.MISSING, buttonColor: Colors.MISSING_BUTTON };
            case Status.Absent:
                return { buttonLabel: ui.ABSENT, buttonColor: Colors.ABSENT_BUTTON };
            case Status.Found:
                return { buttonLabel: ui.FOUND, buttonColor: Colors.FOUND_BUTTON };
            default:
                throw new Error('Case unaccounted for: `' + status + '`, @buildTableCellProps #ClassDetail.tsx');
        }
    }
}

function mapStoresToProps({ firedrillStore }: Stores, props: Props): StoreProps {
    console.assert(
        props.navigation.state.params !== undefined,
        'Navigation state paramaters are undefined @mapStoresToProps in #ClassDetails.tsx'
    );

    const classID = props.navigation.state.params!.classID;

    return {
        class: firedrillStore.classes.get(classID),
        saveStudentsStatuses: (students: Student[]) => firedrillStore.saveStudentsStatuses(students),
        unclaimClass: () => firedrillStore.unclaimClass(classID)
    };
}

export default inject(mapStoresToProps)(ClassDetail);
