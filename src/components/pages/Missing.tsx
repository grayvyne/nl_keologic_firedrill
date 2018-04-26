import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import { Button, IconButton, Toolbar, Modal } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import blueGrey from 'material-ui/colors/blueGrey';
import { inject } from 'mobx-react';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';
import { Colors } from '../../config/materialUiTheme';
import { Stores } from '../../stores';
import ContentView from '../shared/ContentView';

interface Props {
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
    export const appBarStyle: React.CSSProperties = { boxShadow: 'none' };
    export const toolbarStyle: React.CSSProperties = { alignItems: 'stretch' };
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const iconButton: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
}

class Missing extends React.Component<Props, State> {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
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

    public state = { isManageModalOpen: false };

    public render(): JSX.Element {
        return (
            <View>
                <AppBar position={'absolute'} style={styles.appBarStyle}>
                    <Toolbar style={styles.toolbarStyle}>
                        <IconButton color="inherit" aria-label="Menu" style={styles.iconButtonStyle}>
                            <AppsIcon />
                        </IconButton>
                        <Text>{this.props.firedrillElapsedTime}</Text>
                        {this.props.shouldShowManage && (
                            <Button onClick={() => this.setState({ isManageModalOpen: true })}>Manage</Button>
                        )}
                    </Toolbar>
                </AppBar>
                <ContentView>
                    <ScrollView>
                        <View>
                            <Text>Test Three</Text>
                        </View>
                    </ScrollView>
                </ContentView>
                {this.props.shouldShowManage && (
                    <Modal open={this.state.isManageModalOpen}>
                        <View>
                            <Button onClick={this.handleStartFireDrillClick}>Start Fire Drill</Button>
                            <Button onClick={this.handleCancelFireDrillClick}>Cancel Fire Drill</Button>
                            <Button onClick={this.handleEndFireDrillClick}>End Fire Drill</Button>
                            <Button onClick={this.closeManageModal}>Cancel</Button>
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
        shouldShowManage: firedrillStore.shouldShowManage,
        initiateFireDrill: schoolID => firedrillStore.initiateFiredrill(schoolID),
        endFireDrill: () => firedrillStore.endFireDrill()
    };
}

export default inject(mapStoresToProps)(Missing);
