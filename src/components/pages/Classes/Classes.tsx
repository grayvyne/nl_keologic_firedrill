import AppsIcon from '@material-ui/icons/Apps';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Badge, IconButton, Tab, Tabs } from 'material-ui';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import SwipeableViews from 'react-swipeable-views';
import { Routes } from '../../../config/routes';
import { ClassesStrings as ui } from '../../../config/uiConstants';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ApplicationServices } from '../../../platform';
import { Stores } from '../../../stores';
import { AppBar, NoFiredrillIndicator } from '../../shared';
import { MaterialAlert } from '../../shared/NLMaterialModals/MaterialAlert';
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
    shouldShowConfirmUnclaim: boolean;
    classToBeUnclaimed: FiredrillClass | undefined;
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
    unclaimClass(classID: number): Promise<void>;
}

interface Props extends StoreProps, NavigationScreenProps {}

namespace styles {
    export const tabsStyle: React.CSSProperties = { display: 'flex', flex: 1 };
    export const unclaimedTabStyle: React.CSSProperties = { fontSize: 10, marginRight: 40 };
    export const unclaimedTabBadgeStyle: React.CSSProperties = { marginLeft: -20, fontSize: 8 };
    export const swipeableViewStyle: React.CSSProperties = { backgroundColor: 'white', flex: 1 };
    export const tabFont = { fontSize: 10 };
    export const sharedTabStyle = { height: 56 };
}

/**
 * The container page for the "Classes" tab. This hold a top tab-navigator(<AppBar/>) to switch between "Your Classes" "Find Classes" and "Unclaimed"
 * The content and the tabs are also wrapped in a listener that will hide the functionality when a firedrill is not active
 */
@observer
export class Classes extends React.Component<Props, State> {
    public state: State = {
        index: 0,
        shouldShowConfirmUnclaim: false,
        classToBeUnclaimed: undefined
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
                    <IconButton onClick={ApplicationServices.togglePluginMenu} color="inherit" aria-label="Menu">
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
                            <Tab
                                label={<span style={styles.tabFont}>Your Classes</span>}
                                style={styles.sharedTabStyle}
                            />
                            <Tab
                                label={<span style={styles.tabFont}>Find Classes</span>}
                                style={styles.sharedTabStyle}
                            />
                            <Tab
                                label={
                                    <span>
                                        <span style={styles.unclaimedTabStyle}>{ui.UNCLAIMED}</span>
                                        <Badge
                                            color={this.props.unclaimedClasses.length > 0 ? 'error' : 'secondary'}
                                            badgeContent={this.props.unclaimedClasses.length}
                                            children={<span />}
                                            style={styles.unclaimedTabBadgeStyle}
                                        />
                                    </span>
                                }
                                style={styles.sharedTabStyle}
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
                <MaterialAlert
                    open={this.state.shouldShowConfirmUnclaim}
                    alertTitle={ui.UNCLAIM_TITLE}
                    onPressAffirm={this.handlePressConfirmUnclaim}
                    onPressCancel={this.hideUnclaimAlert}
                    affirmButtonLabel={ui.UNCLAIM_CONFIRM}
                    cancelButtonLabel={ui.UNCLAIM_CANCEL}
                />
            </div>
        );
    }

    private handlePressGoToFindClass = () => {
        this.setState({ index: 1 });
    };

    private handlePressClaim = async (aClass: FiredrillClass): Promise<void> => {
        if (null != aClass.claimedByUserID) {
            this.setState({ shouldShowConfirmUnclaim: true, classToBeUnclaimed: aClass });
        } else {
            ApplicationServices.log('claiming');
            await this.props.claimClass(aClass.classID);
            setTimeout(() => {
                this.setState({ index: 0 });
            }, 500);
        }
    };

    private handlePressGoToClass = (classID: number): void => {
        this.props.navigation.navigate(Routes.ClassDetail, { classID });
    };

    private handlePressConfirmUnclaim = async () => {
        if (null == this.state.classToBeUnclaimed) {
            return;
        }
        await this.props.unclaimClass(this.state.classToBeUnclaimed.classID);
        this.hideUnclaimAlert();
    };

    private hideUnclaimAlert = () => {
        this.setState({ shouldShowConfirmUnclaim: false, classToBeUnclaimed: undefined });
    };
}

function mapStoresToProps({ firedrillStore }: Stores, _props: Props): StoreProps {
    return {
        myClasses: firedrillStore.myClasses,
        classes: firedrillStore.allClasses,
        unclaimedClasses: firedrillStore.unclaimedClasses,
        claimClass: classID => firedrillStore.claimClass(classID),
        unclaimClass: classID => firedrillStore.unclaimClass(classID),
        getClaimedByNameForClass: (aClass: FiredrillClass) => firedrillStore.getClaimedByNameForClass(aClass),
        onChangeSearchTerm: term => firedrillStore.setClassSearchTerm(term),
        matchingSearchClasses: firedrillStore.matchingSearchClasses,
        searchTerm: firedrillStore.classSearchTerm,
        isFiredrillInProgress: firedrillStore.isFiredrillInProgress
    };
}

export default inject(mapStoresToProps)(Classes);
