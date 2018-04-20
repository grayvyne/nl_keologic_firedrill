import * as React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Missing } from '../pages/Missing';
import { Search } from '../pages/Search';
import ClassesNavigator from './ClassesNavigator';
import ChecklistNavigator from './ChecklistNavigator';
import blueGrey from 'material-ui/colors/blueGrey';

const Nav = TabNavigator(
    {
        Classes: ClassesNavigator,
        Missing: { screen: Missing },
        Search: { screen: Search },
        Checklist: ChecklistNavigator
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
    render() {
        return <Nav />;
    }
}
