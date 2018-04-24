import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import { AppBar, IconButton, Toolbar } from 'material-ui';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject } from 'mobx-react';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { Status, Student } from '../../models/Student';
import { ApplicationServices } from '../../services/ApplicationServices';
import { Stores } from '../../stores';
import { ActionTableCell } from '../shared';
import ContentView from '../shared/ContentView';
import TableView from '../shared/TableView';

interface Props {
    students: Student[];
    totalStudentsCount: number;
    foundStudentsCount: number;
}

namespace styles {
    export const personIconStyle: React.CSSProperties = {
        height: 26,
        width: 26
    };
    export const appBarStyle: React.CSSProperties = { boxShadow: 'none' };
    export const toolbarStyle: React.CSSProperties = { alignItems: 'stretch' };
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const iconButton: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
}

class Missing extends React.Component<Props> {
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

    public render(): JSX.Element {
        ApplicationServices.log('props', this.props);
        return (
            <View>
                <AppBar position={'absolute'} style={styles.appBarStyle}>
                    <Toolbar style={styles.toolbarStyle}>
                        <IconButton color="inherit" aria-label="Menu" style={styles.iconButtonStyle}>
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <ContentView>
                    <ScrollView>
                        <Text>{`${this.props.foundStudentsCount}/${this.props.totalStudentsCount}`}</Text>
                        <TableView>
                            {this.props.students.map(student => (
                                <ActionTableCell
                                    key={student.userID}
                                    cellData={{ id: student.userID, label: student.firstName }}
                                />
                            ))}
                        </TableView>
                    </ScrollView>
                </ContentView>
            </View>
        );
    }
}

function mapStoresToProps({ firedrillStore }: Stores): Props {
    return {
        students: firedrillStore.allStudents.filter(student => student.status === Status.Missing),
        totalStudentsCount: firedrillStore.allStudentsCount,
        foundStudentsCount: firedrillStore.allStudentsCount - firedrillStore.missingStudentsCount
    };
}

export default inject(mapStoresToProps)(Missing);
