import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import { Button, IconButton, Modal, Typography } from 'material-ui';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject } from 'mobx-react';
import * as React from 'react';
import { ScrollView, Text, View, ViewStyle } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { ManageFiredrillStrings } from '../../config/uiConstants';
import { Student } from '../../models/Student';
import { Stores } from '../../stores';
import { ActionTableCell, AppBar } from '../shared';
import ContentView from '../shared/ContentView';
import TableView from '../shared/TableView';
import { Status } from '../../models/Status';
import { ApplicationServices } from '../../services/ApplicationServices';

interface Props {
    students: Student[];
    totalStudentsCount: number;
    foundStudentsCount: number;
    firedrillElapsedTime: string;
    shouldShowManage: boolean;
    initiateFireDrill(schoolID: number): Promise<void>;
    endFireDrill(): Promise<void>;
}

interface State {
    isManageModalOpen: boolean;
}

namespace styles {
    export const personIconStyle: React.CSSProperties = {
        height: 26,
        width: 26
    };
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const iconButton: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const titleContainer: ViewStyle = {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    };
}

class Missing extends React.Component<Props, State> {
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

    public state: State = { isManageModalOpen: false };

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
                    <View style={styles.titleContainer}>
                        <Typography variant="title" color="inherit">
                            {this.props.firedrillElapsedTime}
                        </Typography>
                    </View>
                    {this.props.shouldShowManage && (
                        <Button color="inherit" onClick={() => this.setState({ isManageModalOpen: true })}>
                            Manage
                        </Button>
                    )}
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
                {this.props.shouldShowManage && (
                    <Modal open={this.state.isManageModalOpen}>
                        <View>
                            <Button onClick={this.handleStartFireDrillClick}>
                                {ManageFiredrillStrings.START_FIREDRILL}
                            </Button>
                            <Button onClick={this.handleCancelFireDrillClick}>
                                {ManageFiredrillStrings.CANCEL_FIREDRILL}
                            </Button>
                            <Button onClick={this.handleEndFireDrillClick}>
                                {ManageFiredrillStrings.FINISH_FIREDRILL}
                            </Button>
                            <Button onClick={this.closeManageModal}>{ManageFiredrillStrings.CLOSE}</Button>
                        </View>
                    </Modal>
                )}
            </View>
        );
    }

    private closeManageModal = () => this.setState({ isManageModalOpen: false });

    private handleStartFireDrillClick = () => {
        this.props.initiateFireDrill(1);
        this.closeManageModal();
    };

    private handleCancelFireDrillClick = () => {
        this.props.endFireDrill();
        this.closeManageModal();
    };

    private handleEndFireDrillClick = () => {
        this.props.endFireDrill();
        this.closeManageModal();
    };
}

function mapStoresToProps({ firedrillStore }: Stores): Props {
    return {
        students: firedrillStore.allStudents.filter(student => student.status === Status.Missing),
        totalStudentsCount: firedrillStore.allStudentsCount,
        foundStudentsCount: firedrillStore.allStudentsCount - firedrillStore.missingStudentsCount,
        firedrillElapsedTime: firedrillStore.firedrillElapsedTime,
        shouldShowManage: firedrillStore.shouldShowManage,
        initiateFireDrill: schoolID => firedrillStore.initiateFiredrill(schoolID),
        endFireDrill: () => firedrillStore.endFireDrill()
    };
}

export default inject(mapStoresToProps)(Missing);
