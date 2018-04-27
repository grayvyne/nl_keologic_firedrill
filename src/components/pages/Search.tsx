import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject } from 'mobx-react';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { Status } from '../../models/Status';
import { Student } from '../../models/Student';
import { Stores } from '../../stores';
import { ActionTableCell, ContentView, SearchBar, TableView } from '../shared';

interface State {
    index: number;
}

interface Props {
    students: Student[];
    searchTerm: string;
    onChangeSearchTerm(term: string): void;
}

namespace styles {
    export const appBarStyle: React.CSSProperties = { boxShadow: 'none' };
    export const toolBarStyle: React.CSSProperties = { alignItems: 'stretch' };
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
            index: 0
        };
    }

    public handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    public render(): JSX.Element {
        return (
            <View>
                <AppBar position={'absolute'} style={styles.appBarStyle}>
                    <Toolbar style={styles.toolBarStyle}>
                        <IconButton color="inherit" aria-label="Menu" style={styles.iconButtonStyle}>
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <ContentView>
                    <SearchBar text={this.props.searchTerm} onChangeText={this.props.onChangeSearchTerm} />
                    <ScrollView>
                        <TableView>{this.props.students.map(this.renderTableCell)}</TableView>
                    </ScrollView>
                </ContentView>
            </View>
        );
    }

    private renderTableCell = (student: Student): JSX.Element => {
        let cellProps = this.buildTableCellProps(student.status);

        return (
            <ActionTableCell
                key={student.userID}
                cellData={{ id: student.userID, label: student.firstName + ' ' + student.lastName }}
                buttonTextColor="white"
                {...cellProps}
            />
        );
    };

    private buildTableCellProps(status: Status): {} {
        switch (status) {
            case Status.Missing:
                return { buttonLabel: 'Missing', buttonColor: 'red' };
            case Status.Absent:
                return { buttonLabel: 'Absent', buttonColor: 'yellow' };
            case Status.Found:
                return { buttonLabel: 'Found', buttonColor: 'blue' };
            default:
                throw new Error('CASE UNACCOUNTED FOR: `' + status + '`, @buildTableCellProps #ClassDetail.tsx');
        }
    }
}

function mapStoresToProps({ firedrillStore }: Stores): Props {
    return {
        students: firedrillStore.matchingSearchStudents,
        searchTerm: firedrillStore.studentSearchTerm,
        onChangeSearchTerm: term => firedrillStore.setStudentSearchTerm(term)
    };
}

export default inject(mapStoresToProps)(Search);
