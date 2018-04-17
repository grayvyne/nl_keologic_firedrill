import * as React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Missing } from '../pages/Missing';
import { Search } from '../pages/Search';
import { Checklist } from '../pages/Checklist';
import ClassesNavigator from './ClassesNavigator';

const Nav = TabNavigator(
    {
        Classes: { screen: ClassesNavigator },
        Missing: Missing,
        Search: Search,
        Checklist: Checklist
    },
    {
        tabBarPosition: 'bottom',
        tabBarComponent: TabBarBottom,
        tabBarOptions: { style: { position: 'absolute', bottom: 0, left: 0, right: 0 } }
    }
);

export class RootTabNav extends React.Component {
    render() {
        return (
            <Nav
                style={{
                    borderWidth: 1,
                    top: 0,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0
                }}
            />
        );
    }
}
