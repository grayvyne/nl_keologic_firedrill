import * as React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Missing } from '../pages/Missing';
import { Search } from '../pages/Search';
import ClassesNavigator from './ClassesNavigator';
import ChecklistNavigator from './ChecklistNavigator';
import blueGrey from 'material-ui/colors/blueGrey';
import { Routes } from '../../config/routes';

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
            style: { height: 56 },
            labelStyle: {
                marginBottom: 7,
                marginTop: -7,
                fontSize: 12,
                fontWeight: '300'
            },
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
