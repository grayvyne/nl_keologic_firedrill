import AppsIcon from '@material-ui/icons/Apps';
import { Card, IconButton, Input, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { NavigationTabScreenOptions } from 'react-navigation';
import blueGrey from 'material-ui/colors/blueGrey';

interface SearchState {
    index: number;
}

interface SearchProps {
    isVisible: boolean;
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
            <div>
                <AppBar position={'static'} style={{ boxShadow: 'none' }}>
                    <Toolbar style={{ alignItems: 'stretch' }}>
                        <IconButton color="inherit" aria-label="Menu" style={{ alignSelf: 'center', marginLeft: -10 }}>
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Card style={{ margin: 10, padding: 10 }}>
                    <Input placeholder={'Search'} type={'search'} style={{ width: '100%' }} disableUnderline={true} />
                </Card>
            </div>
        );
    }
}

export default Search;
