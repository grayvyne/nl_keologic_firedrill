import {
    IconButton,
    Toolbar,
    Dialog,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
    DialogActions,
    Button,
    Divider
} from 'material-ui';
import { ScrollView, View, TouchableOpacity, Text, Dimensions, ViewStyle, TextStyle } from 'react-native';
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
import { Status, statusToString, stringToStatus } from '../../models/Status';
import { MaterialAlert } from '../shared/MaterialAlert';
import { ClassDetailStrings as ui } from '../../config/uiConstants';
import { Colors } from '../../config/materialUiTheme';

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
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center'
    };
    export const containerBackground = { backgroundColor: 'white' };
    export const stretchItems = { alignItems: 'stretch' };
    export const submitClassButton: ViewStyle = {
        height: 50,
        width: '75%',
        backgroundColor: '#71BF83',
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
    export const centerContent = { justifyContent: 'center', alignItems: 'center' };
    export const dialogContainer = {
        width: Dimensions.get('window').width - 150,
        backgroundColor: 'white',
        paddingTop: 30
    };
    export const chooseStatusHeader: CSSProperties = {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20
    };
    export const radioButton = { marginLeft: 20, marginRight: 20 };
    export const divider = { marginTop: 20 };
    export const buttonTextColor = 'white';
}

interface StoreProps {
    class: FiredrillClass | undefined;
    saveMultipleStudentStatuses: (students: Student[]) => void;
}

interface Props extends NavigationScreenProps<{ classID: number }>, StoreProps {}

interface State {
    editStatusModalIsVisible: boolean;
    selectedStudentStatus: string;
    selectedStudent?: Student;
    showSubmitClassAlert: boolean;
    students: Student[];
    studentsWithUpdatedStatuses: { id: number; status: Status }[];
}

@observer
class ClassDetail extends React.Component<Props, State> {
    public state: State = {
        editStatusModalIsVisible: false,
        selectedStudentStatus: statusToString(Status.Found),
        showSubmitClassAlert: false,
        students: this.props.class!.students,
        studentsWithUpdatedStatuses: this.props.class!.students.map(val => {
            return { id: val.userID, status: val.status };
        })
    };

    public render(): JSX.Element {
        const foundLabel = statusToString(Status.Found);
        const absentLabel = statusToString(Status.Absent);
        const missingLabel = statusToString(Status.Missing);

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

                <Dialog open={this.state.editStatusModalIsVisible} style={styles.centerContent}>
                    <View style={styles.dialogContainer}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={styles.chooseStatusHeader}>
                                {ui.CHOOSE_STATUS}
                            </FormLabel>

                            <RadioGroup
                                value={this.state.selectedStudentStatus}
                                onChange={this.tappedRadioOptionInModal}
                            >
                                <FormControlLabel
                                    value={foundLabel}
                                    control={<Radio style={styles.radioButton} />}
                                    label={foundLabel}
                                />
                                <FormControlLabel
                                    value={absentLabel}
                                    control={<Radio style={styles.radioButton} />}
                                    label={absentLabel}
                                />
                                <FormControlLabel
                                    value={missingLabel}
                                    control={<Radio style={styles.radioButton} />}
                                    label={missingLabel}
                                />
                            </RadioGroup>
                            <Divider style={styles.divider} />
                            <DialogActions>
                                <Button onClick={this.cancelUpdateStudentStatus} color="primary">
                                    {ui.CANCEL}
                                </Button>
                                <Button onClick={this.updateStudentStatus} color="primary">
                                    {ui.OK}
                                </Button>
                            </DialogActions>
                        </FormControl>
                    </View>
                </Dialog>

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

        for (const item of this.state.studentsWithUpdatedStatuses) {
            switch (item.status) {
                case Status.Missing:
                    updatedStudents.find(s => s.userID === item.id)!.markAsMissing();
                    break;
                case Status.Found:
                    updatedStudents.find(s => s.userID === item.id)!.markAsFound();
                    break;
                case Status.Absent:
                    updatedStudents.find(s => s.userID === item.id)!.markAsAbsent();
                    break;
                default:
                    throw new Error('Case unaccounted for @updateStudentStatus #ClassDetail.tsx');
            }
        }

        this.props.saveMultipleStudentStatuses(updatedStudents);
    }

    private cancelUpdateStudentStatus = () => {
        this.setState({ editStatusModalIsVisible: false });
    };

    private updateStudentStatus = () => {
        const updatedStatus = this.state.selectedStudentStatus;
        const selectedStudent = this.state.selectedStudent!;

        const statuses = [...this.state.studentsWithUpdatedStatuses];
        const updatedStudentIndex = this.state.studentsWithUpdatedStatuses.findIndex(
            s => selectedStudent.userID === s.id
        );

        statuses[updatedStudentIndex].status = stringToStatus(updatedStatus);

        this.setState({
            editStatusModalIsVisible: false,
            selectedStudentStatus: statusToString(Status.Found),
            selectedStudent: undefined,
            studentsWithUpdatedStatuses: statuses
        });
    };

    private getStatusForStudent(student: Student): Status {
        return this.state.studentsWithUpdatedStatuses.find(s => s.id === student.userID)!.status;
    }

    private tappedRadioOptionInModal = (event: any) => {
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
    return {
        class: firedrillStore.classes.get(props.navigation.state.params!.classID),
        saveMultipleStudentStatuses: (students: Student[]) => firedrillStore.saveMultipleStudentStatuses(students)
    };
}

export default inject(mapStoresToProps)(ClassDetail);
