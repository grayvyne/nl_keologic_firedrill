import AppsIcon from '@material-ui/icons/Apps';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Badge, IconButton, Tab, Tabs } from 'material-ui';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import SwipeableViews from 'react-swipeable-views';
import { Routes } from '../../../config/routes';
import { sharedTabStyle } from '../../../config/sharedStyles';
import { ClassesStrings as ui } from '../../../config/uiConstants';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ApplicationServices } from '../../../platform';
import { Stores } from '../../../stores';
import { AppBar, NoFiredrillIndicator } from '../../shared';
import FindClasses from './FindClasses';
import MyClasses from './MyClasses';
import UnclaimedClasses from './UnclaimedClasses';

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
    matchingSearchClasses: FiredrillClass[];
    searchTerm: string;
    isFiredrillInProgress: boolean;
    onChangeSearchTerm(term: string): void;
    getClaimedByNameForClass(aClass: FiredrillClass): string;
    claimClass(classID: number): Promise<void>;
}

interface Props extends StoreProps, NavigationScreenProps {}

namespace styles {
    export const iconButtonStyle: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const tabsStyle: React.CSSProperties = { height: '100%', display: 'flex', flex: 1 };
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

    public handleTabChange = (_event: any, index: number) => {
        this.setState({ index });
    };

    public handleChange = (index: number) => {
        this.setState({ index });
    };

    public render(): JSX.Element {
        return (
            <div>
                <AppBar>
                    <IconButton
                        onClick={ApplicationServices.togglePluginMenu}
                        color="inherit"
                        aria-label="Menu"
                        style={styles.iconButtonStyle}
                    >
                        <AppsIcon />
                    </IconButton>
                    {this.props.isFiredrillInProgress && (
                        <Tabs
                            value={this.state.index}
                            onChange={this.handleTabChange}
                            indicatorColor="white"
                            textColor="inherit"
                            fullWidth={true}
                            style={styles.tabsStyle}
                        >
                            <Tab label={<span style={styles.tabFont}>Your Classes</span>} style={sharedTabStyle} />
                            <Tab label={<span style={styles.tabFont}>Find Classes</span>} style={sharedTabStyle} />
                            <Tab
                                label={
                                    <span>
                                        <span style={styles.unclaimedTabStyle}>{ui.UNCLAIMED}</span>
                                        <Badge
                                            color="error"
                                            badgeContent={this.props.unclaimedClasses.length}
                                            children={<span />}
                                            style={styles.unclaimedTabBadgeStyle}
                                        />
                                    </span>
                                }
                                style={sharedTabStyle}
                            >
                                <CheckIcon />
                            </Tab>
                        </Tabs>
                    )}
                </AppBar>
                <NoFiredrillIndicator>
                    <SwipeableViews
                        index={this.state.index}
                        onChangeIndex={this.handleChange}
                        style={styles.swipeableViewStyle}
                    >
                        <MyClasses
                            classes={this.props.myClasses}
                            onClickClass={this.handlePressGoToClass}
                            onClickFindClass={this.handlePressGoToFindClass}
                        />
                        <FindClasses
                            getClaimedByNameForClass={this.props.getClaimedByNameForClass}
                            classes={this.props.matchingSearchClasses}
                            onPressClaim={this.handlePressClaim}
                            searchTerm={this.props.searchTerm}
                            onChangeSearchTerm={this.props.onChangeSearchTerm}
                        />
                        <UnclaimedClasses
                            getClaimedByNameForClass={this.props.getClaimedByNameForClass}
                            onPressClaim={this.handlePressClaim}
                            classes={this.props.unclaimedClasses}
                        />
                    </SwipeableViews>
                </NoFiredrillIndicator>
            </div>
        );
    }

    private handlePressGoToFindClass = () => {
        this.setState({ index: 1 });
    };

    private handlePressClaim = (classID: number): Promise<void> => {
        return this.props.claimClass(classID);
    };

    private handlePressGoToClass = (classID: number): void => {
        this.props.navigation.navigate(Routes.ClassDetail, { classID });
    };
}

function mapStoresToProps({ firedrillStore }: Stores, _props: Props): StoreProps {
    return {
        myClasses: firedrillStore.myClasses,
        classes: firedrillStore.allClasses,
        unclaimedClasses: firedrillStore.unclaimedClasses,
        claimClass: classID => firedrillStore.claimClass(classID),
        getClaimedByNameForClass: (aClass: FiredrillClass) => firedrillStore.getClaimedByNameForClass(aClass),
        onChangeSearchTerm: term => firedrillStore.setClassSearchTerm(term),
        matchingSearchClasses: firedrillStore.matchingSearchClasses,
        searchTerm: firedrillStore.classSearchTerm,
        isFiredrillInProgress: firedrillStore.isFiredrillInProgress
    };
}

export default inject(mapStoresToProps)(Classes);
