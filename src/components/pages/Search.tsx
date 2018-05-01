import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from 'material-ui';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject } from 'mobx-react';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { Student } from '../../models/Student';
import { Stores } from '../../stores';
import { ApplicationServices } from '../../services/ApplicationServices';
import { ContentView, SearchBar, StudentTableCell, TableView, AppBar } from '../shared';
import { SearchTabStrings as ui } from '../../config/uiConstants';
import { Status } from '../../models/Status';
import { ChangeEvent } from 'react';
import { MaterialRadioInputList } from '../shared/PopupModals/MaterialRadioInputList';

interface State {
    index: number;
    editStatusModalIsVisible: boolean;
    selectedStudentStatus: Status;
    selectedStudent?: Student;
}

interface Props {
    students: Student[];
    searchTerm: string;
    onChangeSearchTerm(term: string): void;
    markStudentAbsent(studentID: number): void;
    markStudentMissing(studentID: number): void;
    markStudentFound(studentID: number): void;
}

namespace styles {
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const cardStyle: React.CSSProperties = { margin: 10, padding: 10 };
    export const searchInputStyle: React.CSSProperties = { width: '100%' };
    export const iconButton: React.CSSProperties = { height: 25, width: 25 };
}

class Search extends React.Component<Props, State> {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
            return (
                <SearchIcon
                    style={{
                        ...styles.iconButton,
                        color: focused ? blueGrey[800] : Colors.DISABLED_TAB_ICON
                    }}
                />
            );
        }
    };

    public constructor(props: Props) {
        super(props);
        this.state = {
            index: 0,
            editStatusModalIsVisible: false,
            selectedStudentStatus: Status.Found
        };
    }

    public handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    public render(): JSX.Element {
        return (
            <View>
                <AppBar position={'absolute'}>
                    <IconButton
                        onClick={ApplicationServices.togglePluginMenu}
                        color="inherit"
                        aria-label="Menu"
                        style={styles.iconButtonStyle}
                    >
                        <AppsIcon />
                    </IconButton>
                </AppBar>

                <ContentView>
                    <SearchBar text={this.props.searchTerm} onChangeText={this.props.onChangeSearchTerm} />
                    <ScrollView>
                        <TableView>{this.props.students.map(this.renderTableCell)}</TableView>
                    </ScrollView>
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
            </View>
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

    private cancelUpdateStudentStatus = () => {
        this.setState({ editStatusModalIsVisible: false });
    };

    private updateStudentStatus = () => {
        const updatedStatus = this.state.selectedStudentStatus;
        const selectedStudent = this.state.selectedStudent!;

        this.markStudentAs(updatedStatus, selectedStudent);

        this.setState({
            editStatusModalIsVisible: false,
            selectedStudentStatus: Status.Found,
            selectedStudent: undefined
        });
    };

    private markStudentAs = (status: Status, student: Student) => {
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
    };

    private renderTableCell = (student: Student): JSX.Element => {
        return (
            <StudentTableCell
                student={student}
                status={student.status}
                onClick={() => {
                    this.openUpdateStatusModal(student);
                }}
            />
        );
    };

    private openUpdateStatusModal(student: Student) {
        this.setState({ selectedStudent: student, editStatusModalIsVisible: true });
    }
}

function mapStoresToProps({ firedrillStore }: Stores): Props {
    return {
        students: firedrillStore.matchingSearchStudents,
        searchTerm: firedrillStore.studentSearchTerm,
        onChangeSearchTerm: term => firedrillStore.setStudentSearchTerm(term),
        markStudentAbsent: (id: number) => firedrillStore.markStudentAsAbsent(id),
        markStudentMissing: (id: number) => firedrillStore.markStudentAsMissiong(id),
        markStudentFound: (id: number) => firedrillStore.markStudentAsFound(id)
    };
}

export default inject(mapStoresToProps)(Search);
