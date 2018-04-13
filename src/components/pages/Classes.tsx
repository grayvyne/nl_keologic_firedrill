import AppsIcon from '@material-ui/icons/Apps';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Badge, IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import TabStyles from '../../config/TabStyles';

interface ClassesState {
    index: number;
}

interface ClassesProps {
    isVisible: boolean;
}

export class Classes extends React.Component<ClassesProps, ClassesState> {
    constructor(props: ClassesProps) {
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
                        <Tabs
                            value={this.state.index}
                            onChange={this.handleChange}
                            indicatorColor="white"
                            textColor="inherit"
                            fullWidth={true}
                            style={{ height: '100%' }}
                        >
                            <Tab label={<span style={{ fontSize: 10 }}>Your Classes</span>} style={TabStyles} />
                            <Tab label={<span style={{ fontSize: 10 }}>Find Classes</span>} style={TabStyles} />
                            <Tab
                                label={
                                    <span>
                                        <span style={{ fontSize: 10, marginRight: 40 }}>Unclaimed</span>
                                        <Badge
                                            color="secondary"
                                            badgeContent={999}
                                            children={<span />}
                                            style={{ marginLeft: -20 }}
                                        />
                                    </span>
                                    // tslint:disable-next-line:jsx-curly-spacing
                                }
                                style={TabStyles}
                            >
                                <CheckIcon />
                            </Tab>
                        </Tabs>
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

export default Classes;
