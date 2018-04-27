import * as React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Missing from '../pages/Missing';
import { Search } from '../pages/Search';
import ClassesNavigator from './ClassesNavigator';
import ChecklistNavigator from './ChecklistNavigator';
import blueGrey from 'material-ui/colors/blueGrey';
import { Routes } from '../../config/routes';
import { TextStyle } from 'react-native';

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

export class RootTabNav extends React.Component {
    public render(): JSX.Element {
        return <Nav />;
    }
}
