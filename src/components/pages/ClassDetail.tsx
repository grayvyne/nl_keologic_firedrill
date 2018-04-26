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
import { CSSProperties } from 'react';
import { Status } from '../../models/Status';
import { ClassDetailStrings as ui } from '../../config/uiConstants';
import { Colors } from '../../config/materialUiTheme';
import { MaterialRadioInputList } from '../shared/PopupModals/MaterialRadioInputList';
import { MaterialAlert } from '../shared/PopupModals/MaterialAlert';

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
    saveMultipleStudentStatuses: (students: Student[]) => void;
}

interface Props extends NavigationScreenProps<{ classID: number }>, StoreProps {}

interface State {
    editStatusModalIsVisible: boolean;
    selectedStudentStatus: Status;
    selectedStudent?: Student;
    showSubmitClassAlert: boolean;
    students: Student[];
    updatedStudentStatusesByStudentId: Map<number, Status>;
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
            updatedStudentStatusesByStudentId: studentStatusMapById
        };
    }

    public render(): JSX.Element | null {
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
            </View>
        );
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
            switch (status) {
                case Status.Missing:
                    updatedStudents.find(s => s.userID === id)!.markAsMissing();
                    break;
                case Status.Found:
                    updatedStudents.find(s => s.userID === id)!.markAsFound();
                    break;
                case Status.Absent:
                    updatedStudents.find(s => s.userID === id)!.markAsAbsent();
                    break;
                default:
                    throw new Error('Case unaccounted for @updateStudentStatus #ClassDetail.tsx');
            }
        });

        this.props.saveMultipleStudentStatuses(updatedStudents);
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

        return status!;
    }

    private onPressRadioOption = (event: any) => {
        this.setState({ selectedStudentStatus: event.target.value });
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
        props.navigation.state.params != undefined,
        'Navigation state paramaters are undefined @mapStoresToProps in #ClassDetails.tsx'
    );
    return {
        class: firedrillStore.classes.get(props.navigation.state.params!.classID),
        saveMultipleStudentStatuses: (students: Student[]) => firedrillStore.saveMultipleStudentStatuses(students)
    };
}

export default inject(mapStoresToProps)(ClassDetail);
