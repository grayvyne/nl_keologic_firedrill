import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import PersonIcon from '@material-ui/icons/Person';
import { NavigationTabScreenOptions } from 'react-navigation';
import blueGrey from 'material-ui/colors/blueGrey';

interface MissingState {
    index: number;
}

interface MissingProps {
    isVisible: boolean;
}

export class Missing extends React.Component<MissingProps, MissingState> {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
            return (
                <PersonIcon style={{ height: 26, width: 26, color: focused ? blueGrey[800] : 'rgba(0, 0, 0, 0.26)' }} />
            );
        }
    };
    constructor(props: MissingProps) {
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
                <SwipeableViews index={this.state.index} onChangeIndex={this.handleChange}>
                    <div>Test One</div>
                    <div>Test Two</div>
                    <div>Test Three</div>
                </SwipeableViews>
            </div>
        );
    }
}

export default Missing;
