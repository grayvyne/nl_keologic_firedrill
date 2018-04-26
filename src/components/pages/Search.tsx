import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import blueGrey from 'material-ui/colors/blueGrey';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';
import ContentView from '../shared/ContentView';
import SearchBar from '../shared/SearchBar';
import { Colors } from '../../config/materialUiTheme';

interface State {
    index: number;
}

interface Props {
    isVisible: boolean;
}

namespace styles {
    export const appBarStyle: React.CSSProperties = { boxShadow: 'none' };
    export const toolBarStyle: React.CSSProperties = { alignItems: 'stretch' };
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const cardStyle: React.CSSProperties = { margin: 10, padding: 10 };
    export const searchInputStyle: React.CSSProperties = { width: '100%' };
    export const iconButton: React.CSSProperties = { height: 25, width: 25 };
}

export class Search extends React.Component<Props, State> {
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
                    <SearchBar
                        text={''}
                        onChangeText={() => {
                            return;
                        }}
                    />
                    <ScrollView>
                        <View>
                            <Text>TEST 123456</Text>
                        </View>
                    </ScrollView>
                </ContentView>
            </View>
        );
    }
}

export default Search;
