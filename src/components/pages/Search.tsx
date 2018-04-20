import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { NavigationTabScreenOptions } from 'react-navigation';
import blueGrey from 'material-ui/colors/blueGrey';
import { View, Text, ScrollView } from 'react-native';
import ContentView from '../shared/ContentView';
import SearchBar from '../shared/SearchBar';

interface SearchState {
    index: number;
}

interface SearchProps {
    isVisible: boolean;
}

namespace style {
    export const appBarStyle: React.CSSProperties = { boxShadow: 'none' };
    export const toolBarStyle: React.CSSProperties = { alignItems: 'stretch' };
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const cardStyle: React.CSSProperties = { margin: 10, padding: 10 };
    export const searchInputStyle: React.CSSProperties = { width: '100%' };
}

export class Search extends React.Component<SearchProps, SearchState> {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
            return (
                <SearchIcon style={{ height: 25, width: 25, color: focused ? blueGrey[800] : 'rgba(0, 0, 0, 0.26)' }} />
            );
        }
    };
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            index: 0
        };
    }

    handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    render() {
        return (
            <View>
                <AppBar position={'absolute'} style={style.appBarStyle}>
                    <Toolbar style={style.toolBarStyle}>
                        <IconButton color="inherit" aria-label="Menu" style={style.iconButtonStyle}>
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <ContentView>
                    <SearchBar />
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
