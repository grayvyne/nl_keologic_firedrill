import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';

export default class ClassDetail extends React.Component<NavigationScreenProps> {
    render() {
        return (
            <div>
                <AppBar position={'static'} style={{ boxShadow: 'none' }}>
                    <Toolbar style={{ alignItems: 'stretch' }}>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            style={{ alignSelf: 'center', marginLeft: -10 }}
                            onClick={() => this.props.navigation.goBack()}
                        >
                            <BackIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div>
                    <div>Test One</div>
                    <div>Test Two</div>
                    <div>Test Three</div>
                </div>
            </div>
        );
    }
}
