import { IconButton } from 'material-ui';
import { ScrollView, View, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import BackIcon from '@material-ui/icons/ArrowBack';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import ContentView from '../shared/ContentView';
import TableView from '../shared/TableView';
import { FiredrillClass } from '../../models/FiredrillClass';
import { Stores } from '../../stores';
import { inject, observer } from 'mobx-react';
import { StudentTableCell, AppBar } from '../shared';
import { Student } from '../../models/Student';
import { CSSProperties, ChangeEvent } from 'react';
import { Status } from '../../models/Status';
import { ClassDetailStrings as ui } from '../../config/uiConstants';
import { Colors } from '../../config/materialUiTheme';
import { MaterialRadioInputList } from '../shared/PopupModals/MaterialRadioInputList';
import { MaterialAlert } from '../shared/PopupModals/MaterialAlert';
import { getGradeTitleFromGradeLevel } from '../../models/Class';
import { Button } from 'material-ui';

namespace styles {
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

    export const navBarTitleContainer: ViewStyle = {
        position: 'absolute',
        top: 14,
        left: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    };

    export const navBarTitle: TextStyle = {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    };

    export const navBarSubTitle: TextStyle = { textAlign: 'center', fontWeight: 'bold', fontSize: 10 };

    export const unclaimClassButton: ViewStyle = { height: '100%', width: 100, alignSelf: 'center', marginRight: -10 };

    export const unclaimClassText: TextStyle = { textAlign: 'center', fontSize: 12, color: 'white' };
}

interface StoreProps {
    class: FiredrillClass | undefined;
    markStudentAsMissing: (id: number) => void;
    markStudentAsAbsent: (id: number) => void;
    markStudentAsFound: (id: number) => void;
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
        const currentClass = this.props.class;
        if (currentClass === undefined) {
            return null;
        }

        return (
            <View style={styles.containerBackground}>
                <AppBar position={'fixed'}>
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
                    <View style={styles.navBarTitleContainer}>
                        <Text style={styles.navBarTitle}>{getGradeTitleFromGradeLevel(currentClass.gradeLevel)}</Text>
                        <Text style={styles.navBarSubTitle}>{currentClass.getTeachers()[0].lastName}</Text>
                    </View>

                    <View style={styles.unclaimClassButton}>
                        <Button onClick={() => this.unclaimClass()}>
                            <Text style={styles.unclaimClassText}>{ui.UNCLAIM}</Text>
                        </Button>
                    </View>
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

    private saveClassStudentStatuses(): void {
        this.state.updatedStudentStatusesByStudentId.forEach((status, id) => {
            switch (status) {
                case Status.Missing:
                    this.props.markStudentAsMissing(id);
                    break;
                case Status.Found:
                    this.props.markStudentAsFound(id);
                    break;
                case Status.Absent:
                    this.props.markStudentAsAbsent(id);
                    break;
                default:
                    throw new Error('Case unaccounted for @updateStudentStatus #ClassDetail.tsx');
            }
        });
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
        return (
            <StudentTableCell
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
        markStudentAsMissing: (id: number) => firedrillStore.markStudentAsMissiong(id),
        markStudentAsAbsent: (id: number) => firedrillStore.markStudentAsAbsent(id),
        markStudentAsFound: (id: number) => firedrillStore.markStudentAsFound(id)
    };
}

export default inject(mapStoresToProps)(ClassDetail);
