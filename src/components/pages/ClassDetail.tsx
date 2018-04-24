import BackIcon from '@material-ui/icons/ArrowBack';
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
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { ScrollView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import ContentView from '../shared/ContentView';
import TableView from '../shared/TableView';
import { FiredrillClass } from '../../models/FiredrillClass';
import { Stores } from '../../stores';
import { inject, observer } from 'mobx-react';
import { ActionTableCell } from '../shared';
import { Student } from '../../models/Student';
import { CSSProperties } from 'react';
import { Status, StatusToString, StringToStatus } from '../../models/Status';
import { MaterialAlert } from '../shared/MaterialAlert';

namespace styles {
    export const hideBoxShadow = { boxShadow: 'none' };
    export const iconButton: CSSProperties = { alignSelf: 'center', marginLeft: -10 };
}

interface StoreProps {
    class: FiredrillClass | undefined;
    saveMultipleStudentStatuses: (students: Student[]) => void;
}

interface Props extends NavigationScreenProps<{ classID: number }>, StoreProps {}

interface State {
    editStatusModalIsVisible: boolean;
    studentStatus: string;
    selectedStudent?: Student;
    showSubmitClassAlert: boolean;
    students: Student[];
    originalStatuses: { id: number; status: Status }[];
}

@observer
class ClassDetail extends React.Component<Props, State> {
    public state: State = {
        editStatusModalIsVisible: false,
        studentStatus: StatusToString(Status.Found),
        showSubmitClassAlert: false,
        students: this.props.class!.students,
        originalStatuses: this.props.class!.students.map(val => {
            return { id: val.userID, status: val.status };
        })
    };

    public render(): JSX.Element {
        const foundLabel = StatusToString(Status.Found);
        const absentLabel = StatusToString(Status.Absent);
        const missingLabel = StatusToString(Status.Missing);

        return (
            <View style={{ backgroundColor: 'white' }}>
                <AppBar position={'fixed'} style={styles.hideBoxShadow}>
                    <Toolbar style={{ alignItems: 'stretch' }}>
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
                        <TableView style={{ paddingBottom: 150 }}>
                            {this.state.students.map(this.renderTableCell)}
                        </TableView>
                    </ScrollView>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: 80,
                            backgroundColor: '#EEEEEE',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: '75%',
                                backgroundColor: '#71BF83',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 3
                            }}
                            onPress={() => this.onPressSubmitClass()}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                                {'SUBMIT CLASS'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ContentView>

                <Dialog
                    open={this.state.editStatusModalIsVisible}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <View
                        style={{
                            width: Dimensions.get('window').width - 150,
                            backgroundColor: 'white',
                            paddingTop: 30
                        }}
                    >
                        <FormControl component="fieldset">
                            <FormLabel
                                component="legend"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: 'black',
                                    marginBottom: 20,
                                    marginTop: 20,
                                    marginLeft: 20
                                }}
                            >
                                {'Choose Status'}
                            </FormLabel>

                            <RadioGroup value={this.state.studentStatus} onChange={this.tappedRadioOptionInModal}>
                                <FormControlLabel
                                    value={foundLabel}
                                    control={<Radio style={{ marginLeft: 20, marginRight: 20 }} />}
                                    label={foundLabel}
                                />
                                <FormControlLabel
                                    value={absentLabel}
                                    control={<Radio style={{ marginLeft: 20, marginRight: 20 }} />}
                                    label={absentLabel}
                                />
                                <FormControlLabel
                                    value={missingLabel}
                                    control={<Radio style={{ marginLeft: 20, marginRight: 20 }} />}
                                    label={missingLabel}
                                />
                            </RadioGroup>
                            <Divider style={{ marginTop: 20 }} />
                            <DialogActions>
                                <Button onClick={this.cancelUpdateStudentStatus} color="primary">
                                    CANCEL
                                </Button>
                                <Button onClick={this.updateStudentStatus} color="primary">
                                    OK
                                </Button>
                            </DialogActions>
                        </FormControl>
                    </View>
                </Dialog>

                <MaterialAlert
                    alertTitle="Submit Class?"
                    alertMessage="Are you finished updating students statuses?"
                    open={this.state.showSubmitClassAlert}
                    onPressCancel={() => this.cancelSubmitClass()}
                    onPressOK={() => this.confirmSubmitClass()}
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

    private saveClassStudentStatuses() {
        const updatedStudents = [...this.state.students];

        for (const item of this.state.originalStatuses) {
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
        const updatedStatus = this.state.studentStatus;
        const selectedStudent = this.state.selectedStudent!;

        const statuses = [...this.state.originalStatuses];
        const updatedStudentIndex = this.state.originalStatuses.findIndex(s => selectedStudent.userID === s.id);
        statuses[updatedStudentIndex].status = StringToStatus(updatedStatus);

        this.setState({
            editStatusModalIsVisible: false,
            studentStatus: StatusToString(Status.Found),
            selectedStudent: undefined,
            originalStatuses: statuses
        });
    };

    private getStatusForStudent(student: Student): Status {
        return this.state.originalStatuses.find(s => s.id === student.userID)!.status;
    }

    private tappedRadioOptionInModal = (event: any) => {
        this.setState({ studentStatus: event.target.value });
    };

    private showEditStudentStatusModal = (student: Student) => {
        this.setState({ selectedStudent: student, editStatusModalIsVisible: true });
    };

    private renderTableCell = (student: Student): JSX.Element => {
        let cellProps = this.buildTableCellProps(student);

        return (
            <ActionTableCell
                key={student.userID}
                cellData={{ id: student.userID, label: student.firstName + ' ' + student.lastName }}
                buttonTextColor="white"
                {...cellProps}
                onClick={() => this.showEditStudentStatusModal(student)}
            />
        );
    };

    private buildTableCellProps(student: Student): {} {
        const status = this.getStatusForStudent(student);

        switch (status) {
            case Status.Missing:
                return { buttonLabel: 'Missing', buttonColor: '#EC5F59' };
            case Status.Absent:
                return { buttonLabel: 'Absent', buttonColor: '#49A8EE' };
            case Status.Found:
                return { buttonLabel: 'Found', buttonColor: '#71BF83' };
            default:
                throw new Error('CASE UNACCOUNTED FOR: `' + status + '`, @buildTableCellProps #ClassDetail.tsx');
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
