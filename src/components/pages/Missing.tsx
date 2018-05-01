import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import { Button, IconButton, LinearProgress, Typography } from 'material-ui';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject } from 'mobx-react';
import * as React from 'react';
import { ScrollView, Text, View, ViewStyle } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { ManageFiredrillStrings, MissingStrings } from '../../config/uiConstants';
import { Status } from '../../models/Status';
import { Student } from '../../models/Student';
import { ApplicationServices } from '../../services/ApplicationServices';
import { Stores } from '../../stores';
import { AppBar, ContentView, StudentTableCell, TableHeader, TableView } from '../shared';
import { SharedDialogContainer } from '../shared/PopupModals/SharedDialogContainer';

interface Props {
    students: Student[];
    totalStudentsCount: number;
    foundStudentsCount: number;
    firedrillElapsedTime: string;
    shouldShowManage: boolean;
    isFiredrillInProgress: boolean;
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
    export const missingBarContainer: ViewStyle = { justifyContent: 'center', alignItems: 'center' };
    export const missingBar: React.CSSProperties = { height: 40, alignSelf: 'stretch' };
    export const missingText: React.CSSProperties = { position: 'absolute', color: Colors.BACKGROUND };
    export const manageButton: React.CSSProperties = { margin: 20 };
    export const headerLeft: ViewStyle = { display: 'flex', flexGrow: 1 };
    export const headerRight: ViewStyle = { marginRight: 25 };
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
                    <View style={styles.titleContainer} pointerEvents="none">
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
                    <View style={styles.missingBarContainer}>
                        <LinearProgress
                            variant="determinate"
                            value={this.props.foundStudentsCount / this.props.totalStudentsCount * 100}
                            style={styles.missingBar}
                            color="secondary"
                        />
                        <Typography variant="subheading" style={styles.missingText}>
                            {MissingStrings.MISSING_STUDENTS_COUNT(
                                this.props.foundStudentsCount,
                                this.props.totalStudentsCount
                            )}
                        </Typography>
                    </View>
                    <ScrollView>
                        <TableView>
                            <TableHeader>
                                <View style={styles.headerLeft}>
                                    <Text>{MissingStrings.HEADING_NAME}</Text>
                                </View>
                                <View style={styles.headerRight}>
                                    <Text>{MissingStrings.HEADING_STATUS}</Text>
                                </View>
                            </TableHeader>
                            {this.props.students.map(student => (
                                <StudentTableCell
                                    key={student.userID}
                                    student={student}
                                    status={student.status}
                                    onClick={() => {
                                        // TODO: Add status modal
                                        return;
                                    }}
                                />
                            ))}
                        </TableView>
                    </ScrollView>
                </ContentView>
                {this.props.shouldShowManage && (
                    <SharedDialogContainer open={this.state.isManageModalOpen}>
                        <View style={{ flex: 1, alignSelf: 'stretch', padding: 10 }}>
                            <Button
                                style={styles.manageButton}
                                variant="raised"
                                color="secondary"
                                onClick={this.handleStartFireDrillClick}
                                disabled={this.props.isFiredrillInProgress}
                            >
                                {ManageFiredrillStrings.START_FIREDRILL}
                            </Button>
                            <Button
                                style={styles.manageButton}
                                variant="raised"
                                color="primary"
                                onClick={this.handleEndFireDrillClick}
                                disabled={false === this.props.isFiredrillInProgress}
                            >
                                {ManageFiredrillStrings.FINISH_FIREDRILL}
                            </Button>
                            <Button
                                style={styles.manageButton}
                                variant="raised"
                                color="primary"
                                onClick={this.handleCancelFireDrillClick}
                                disabled={false === this.props.isFiredrillInProgress}
                            >
                                {ManageFiredrillStrings.CANCEL_FIREDRILL}
                            </Button>
                            <Button style={styles.manageButton} onClick={this.closeManageModal}>
                                {ManageFiredrillStrings.CLOSE}
                            </Button>
                        </View>
                    </SharedDialogContainer>
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
        isFiredrillInProgress: firedrillStore.isFiredrillInProgress,
        initiateFireDrill: schoolID => firedrillStore.initiateFiredrill(schoolID),
        endFireDrill: () => firedrillStore.endFireDrill()
    };
}

export default inject(mapStoresToProps)(Missing);
