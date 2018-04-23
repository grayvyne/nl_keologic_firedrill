import AppsIcon from '@material-ui/icons/Apps';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Badge, IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import TabStyles from '../../config/TabStyles';

interface State {
    index: number;
}

interface Props {
    isVisible: boolean;
}

namespace styles {
    export const tab = { height: '100%' };
    export const tabFont = { fontSize: 10 };
    export const badge = { marginLeft: -20 };
    export const unclaimed = { fontSize: 10, marginRight: 40 };
    export const iconButton: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const alignStretch = { alignItems: 'stretch' };
}

export class Classes extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    public handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    public render(): JSX.Element | null {
        if (this.props.isVisible === false) {
            return null;
        }

        return (
            <div>
                <AppBar position={'static'}>
                    <Toolbar style={styles.alignStretch}>
                        <IconButton color="inherit" aria-label="Menu" style={styles.iconButton}>
                            <AppsIcon />
                        </IconButton>
                        <Tabs
                            value={this.state.index}
                            onChange={this.handleChange}
                            indicatorColor="white"
                            textColor="inherit"
                            fullWidth={true}
                            style={styles.tab}
                        >
                            <Tab label={<span style={styles.tabFont}>Your Classes</span>} style={TabStyles} />
                            <Tab label={<span style={styles.tabFont}>Find Classes</span>} style={TabStyles} />
                            <Tab
                                label={
                                    <span>
                                        <span style={styles.unclaimed}>Unclaimed</span>
                                        <Badge
                                            color="secondary"
                                            badgeContent={999}
                                            children={<span />}
                                            style={styles.badge}
                                        />
                                    </span>
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
        );
    }
}

export default Classes;
