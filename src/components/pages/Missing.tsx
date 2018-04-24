import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import blueGrey from 'material-ui/colors/blueGrey';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';
import ContentView from '../shared/ContentView';
import { Colors } from '../../config/materialUiTheme';

interface Props {
    isVisible: boolean;
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

export class Missing extends React.Component<Props> {
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

    public render(): JSX.Element {
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
                        <View>
                            <Text>Test Three</Text>
                        </View>
                    </ScrollView>
                </ContentView>
            </View>
        );
    }
}

export default Missing;
