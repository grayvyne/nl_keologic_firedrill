import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { NavigationActions } from 'react-navigation';

interface ChecklistDetailState {
    index: number;
}

interface ChecklistDetailProps {
    isVisible: boolean;
}

const backAction = NavigationActions.back();

export class ChecklistDetail extends React.Component<ChecklistDetailProps, ChecklistDetailState> {
    constructor(props: ChecklistDetailProps) {
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
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            style={{ alignSelf: 'center', marginLeft: -10 }}
                            onClick={() => (this.props as any).navigation.dispatch(backAction)}
                        >
                            <BackIcon />
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

export default ChecklistDetail;
