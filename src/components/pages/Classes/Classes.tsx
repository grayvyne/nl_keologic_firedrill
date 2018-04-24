import AppsIcon from '@material-ui/icons/Apps';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { AppBar, Badge, IconButton, Tab, Tabs, Toolbar } from 'material-ui';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import SwipeableViews from 'react-swipeable-views';
import TabStyles from '../../../config/TabStyles';
import { Routes } from '../../../config/routes';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { Stores } from '../../../stores';
import ContentView from '../../shared/ContentView';
import FindClasses from './FindClasses';
import MyClasses from './MyClasses';
import UnclaimedClasses from './UnclaimedClasses';
import { ClassesTabStrings as ui } from '../../../config/uiConstants';

export type SingleClass = {
    id: number;
    name: string;
    grade: string;
    found: number;
    total: number;
};

interface State {
    index: number;
}

interface StoreProps {
    myClasses: FiredrillClass[];
    classes: FiredrillClass[];
    unclaimedClasses: FiredrillClass[];
    claimClass(classID: number): Promise<void>;
}

interface Props extends StoreProps, NavigationScreenProps {}

namespace styles {
    export const appBarStyle: React.CSSProperties = { boxShadow: 'none' };
    export const toolBarStyle: React.CSSProperties = { alignItems: 'stretch' };
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const tabsStyle: React.CSSProperties = { height: '100%' };
    export const unclaimedTabStyle: React.CSSProperties = { fontSize: 10, marginRight: 40 };
    export const unclaimedTabBadgeStyle: React.CSSProperties = { marginLeft: -20, fontSize: 8 };
    export const swipeableViewStyle: React.CSSProperties = { backgroundColor: 'white', height: '100%' };
    export const tabFont = { fontSize: 10 };
}

@observer
export class Classes extends React.Component<Props, State> {
    public state: State = {
        index: 0
    };

    public handleTabChange = (event: any, index: number) => {
        this.setState({ index });
    };

    public handleChange = (index: number) => {
        this.setState({ index });
    };

    public render(): JSX.Element {
        return (
            <ContentView>
                <AppBar position={'fixed'} style={styles.appBarStyle}>
                    <Toolbar style={styles.toolBarStyle}>
                        <IconButton color="inherit" aria-label="Menu" style={styles.iconButtonStyle}>
                            <AppsIcon />
                        </IconButton>
                        <Tabs
                            value={this.state.index}
                            onChange={this.handleTabChange}
                            indicatorColor="white"
                            textColor="inherit"
                            fullWidth={true}
                            style={styles.tabsStyle}
                        >
                            <Tab label={<span style={styles.tabFont}>Your Classes</span>} style={TabStyles} />
                            <Tab label={<span style={styles.tabFont}>Find Classes</span>} style={TabStyles} />
                            <Tab
                                label={
                                    <span>
                                        <span style={styles.unclaimedTabStyle}>{ui.UNCLAIMED}</span>
                                        <Badge
                                            color="secondary"
                                            badgeContent={this.props.unclaimedClasses.length}
                                            children={<span />}
                                            style={styles.unclaimedTabBadgeStyle}
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
                <SwipeableViews
                    index={this.state.index}
                    onChangeIndex={this.handleChange}
                    style={styles.swipeableViewStyle}
                >
                    <MyClasses classes={this.props.myClasses} onClickClass={this.handlePressGoToClass} />
                    <FindClasses classes={this.props.classes} onPressClaim={this.handlePressClaim} />
                    <UnclaimedClasses classes={this.props.unclaimedClasses} />
                </SwipeableViews>
            </ContentView>
        );
    }

    private handlePressClaim = (classID: number): Promise<void> => {
        return this.props.claimClass(classID);
    };

    private handlePressGoToClass = (classID: number): void => {
        this.props.navigation.navigate(Routes.ClassDetail, { classID });
    };
}

function mapStoresToProps({ firedrillStore }: Stores, props: Props): StoreProps {
    return {
        myClasses: firedrillStore.myClasses,
        classes: firedrillStore.allClasses,
        unclaimedClasses: firedrillStore.unclaimedClasses,
        claimClass: classID => firedrillStore.claimClass(classID)
    };
}

export default inject(mapStoresToProps)(Classes);
