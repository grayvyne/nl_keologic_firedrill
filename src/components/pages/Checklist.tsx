import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import SwipeableViews from 'react-swipeable-views';
import AppsIcon from '@material-ui/icons/Apps';
import { Toolbar, IconButton } from 'material-ui';

interface ChecklistState {
    index: number;
}

interface ChecklistProps {
    isVisible: boolean;
}

export class Checklist extends React.Component<ChecklistProps, ChecklistState> {
    constructor(props: ChecklistProps) {
        super(props);
        this.state = {
            index: 0
        };
    }

    handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    render() {
        return this.props.isVisible === true ? (
            <div>
                <AppBar position={'static'}>
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
        ) : null;
    }
}

export default Checklist;
