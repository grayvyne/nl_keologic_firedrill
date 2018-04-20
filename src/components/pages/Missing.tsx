import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { NavigationTabScreenOptions } from 'react-navigation';
import blueGrey from 'material-ui/colors/blueGrey';
import { View, Text, ScrollView } from 'react-native';
import ContentView from '../shared/ContentView';

interface MissingProps {
    isVisible: boolean;
}

namespace style {
    export const personIconStyle: React.CSSProperties = {
        height: 26,
        width: 26
    };
    export const appBarStyle: React.CSSProperties = { boxShadow: 'none' };
    export const toolbarStyle: React.CSSProperties = { alignItems: 'stretch' };
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
}

export class Missing extends React.Component<MissingProps> {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
            return (
                <PersonIcon
                    style={{ ...style.personIconStyle, ...{ color: focused ? blueGrey[800] : 'rgba(0, 0, 0, 0.26)' } }}
                />
            );
        }
    };

    render() {
        return (
            <View>
                <AppBar position={'absolute'} style={style.appBarStyle}>
                    <Toolbar style={style.toolbarStyle}>
                        <IconButton color="inherit" aria-label="Menu" style={style.iconButtonStyle}>
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
