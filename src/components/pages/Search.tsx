import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject } from 'mobx-react';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { Student } from '../../models/Student';
import { Stores } from '../../stores';
import { ContentView, SearchBar, StudentTableCell, TableView, Toolbar } from '../shared';

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
                    <Toolbar>
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
        return (
            <StudentTableCell
                student={student}
                status={student.status}
                onClick={() => {
                    return;
                }}
            />
        );
    };
}

function mapStoresToProps({ firedrillStore }: Stores): Props {
    return {
        students: firedrillStore.matchingSearchStudents,
        searchTerm: firedrillStore.studentSearchTerm,
        onChangeSearchTerm: term => firedrillStore.setStudentSearchTerm(term)
    };
}

export default inject(mapStoresToProps)(Search);
