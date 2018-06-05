import blueGrey from 'material-ui/colors/blueGrey';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { TextStyle } from 'react-native';
import { TabBarBottom, TabNavigator } from 'react-navigation';
import { Routes } from '../../config/routes';
import { EndFiredrillAlertStrings } from '../../config/uiConstants';
import { Stores } from '../../stores';
import Missing from '../pages/Missing';
import Search from '../pages/Search';
import { MaterialAlert } from '../shared/NLMaterialModals/MaterialAlert';
import ChecklistNavigator from './ChecklistNavigator';
import ClassesNavigator from './ClassesNavigator';

interface Props {
    areAllStudentsFound: boolean;
    endFiredrill(): Promise<void>;
}

interface State {
    isAllStudentsFoundAlertVisible: boolean;
    hasAcknowledgedAllStudentsFound: boolean;
}

namespace styles {
    export const tabStyle = { height: 56 };
    export const labelStyle: TextStyle = {
        marginBottom: 7,
        marginTop: -7,
        fontSize: 12,
        fontWeight: '300'
    };
}

const Nav = TabNavigator(
    {
        [Routes.Classes]: ClassesNavigator,
        [Routes.Missing]: { screen: Missing },
        [Routes.Search]: { screen: Search },
        [Routes.Checklist]: ChecklistNavigator
    },
    {
        tabBarPosition: 'bottom',
        tabBarComponent: TabBarBottom,
        tabBarOptions: {
            style: styles.tabStyle,
            labelStyle: styles.labelStyle,
            activeTintColor: blueGrey[800]
        },
        animationEnabled: false,
        swipeEnabled: false
    }
);

/**
 * This is the base level tab navigator that controls the tabs on the bottom of the screen
 * A. Classes (Claimed, Class detail)
 * B. Missing (All students that are missing)
 * C. Search (Search functionality for all students)
 * D. Checklist (Shows all checklists)
 */
@observer
class RootTabNav extends React.Component<Props, State> {
    public state: State = { isAllStudentsFoundAlertVisible: false, hasAcknowledgedAllStudentsFound: false };

    public componentDidMount(): void {
        this.setState({
            isAllStudentsFoundAlertVisible: this.props.areAllStudentsFound
        });
    }

    public componentWillReceiveProps(nextProps: Props): void {
        this.setState({
            isAllStudentsFoundAlertVisible: nextProps.areAllStudentsFound
        });
    }

    public render(): JSX.Element {
        return (
            <div>
                <Nav />
                <MaterialAlert
                    open={this.state.isAllStudentsFoundAlertVisible}
                    alertTitle={EndFiredrillAlertStrings.TITLE}
                    onPressAffirm={this.handleConfirmEndFireDrill}
                    onPressCancel={this.closeModal}
                    affirmButtonLabel={EndFiredrillAlertStrings.CONFIRM}
                    cancelButtonLabel={EndFiredrillAlertStrings.CANCEL}
                />
            </div>
        );
    }

    private handleConfirmEndFireDrill = () => {
        this.props.endFiredrill();
        this.closeModal();
    };

    private closeModal = () => {
        this.setState({ isAllStudentsFoundAlertVisible: false });
    };
}

function mapStoresToProps({ firedrillStore }: Stores): Props {
    const areAllStudentsFound =
        firedrillStore.foundStudentsCount === firedrillStore.totalStudentsCount &&
        firedrillStore.totalStudentsCount > 0 &&
        firedrillStore.shouldShowManage;
    return {
        areAllStudentsFound,
        endFiredrill: () => firedrillStore.endFireDrill()
    };
}

export default inject(mapStoresToProps)(RootTabNav);
