import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Typography } from 'material-ui';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { SearchTabStrings } from '../../config/uiConstants';
import { Status } from '../../models/Status';
import { Student } from '../../models/Student';
import { ApplicationServices } from '../../platform';
import { Stores } from '../../stores';
import {
    AppBar,
    ContentView,
    NoFiredrillIndicator,
    SearchBar,
    StudentTableCell,
    TableView,
    UpdateStudentStatusModal
} from '../shared';

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
    export const cardStyle: React.CSSProperties = { margin: 10, padding: 10 };
    export const searchInputStyle: React.CSSProperties = { width: '100%' };
    export const iconButton: React.CSSProperties = { height: 25, width: 25 };
}

/**
 * This page allows you to search through all students, regardless of status.
 * This page also allows you to update the status of any student
 */
@observer
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
            <div>
                <AppBar position={'absolute'}>
                    <IconButton onClick={ApplicationServices.togglePluginMenu} color="inherit" aria-label="Menu">
                        <AppsIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                        {SearchTabStrings.TITLE}
                    </Typography>
                </AppBar>

                <NoFiredrillIndicator>
                    <ContentView>
                        <SearchBar
                            text={this.props.searchTerm}
                            placeholder={SearchTabStrings.SEARCH_PLACEHOLDER}
                            onChangeText={this.props.onChangeSearchTerm}
                        />
                        <TableView>{this.props.students.map(this.renderTableCell)}</TableView>
                    </ContentView>
                </NoFiredrillIndicator>

                <UpdateStudentStatusModal
                    selectedStudentStatus={
                        null != this.state.selectedStudent ? this.state.selectedStudent.status : undefined
                    }
                    selectedStudent={this.state.selectedStudent}
                    updateStudentMap={this.markStudentAs}
                    open={this.state.editStatusModalIsVisible}
                    close={() => this.setState({ editStatusModalIsVisible: false })}
                />
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

        this.setState({ editStatusModalIsVisible: false });
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
