import blueGrey from 'material-ui/colors/blueGrey';
import * as React from 'react';
import { TextStyle } from 'react-native';
import { TabBarBottom, TabNavigator } from 'react-navigation';
import { Routes } from '../../config/routes';
import Missing from '../pages/Missing';
import Search from '../pages/Search';
import ChecklistNavigator from './ChecklistNavigator';
import ClassesNavigator from './ClassesNavigator';

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
export class RootTabNav extends React.Component {
    public render(): JSX.Element {
        return <Nav />;
    }
}
