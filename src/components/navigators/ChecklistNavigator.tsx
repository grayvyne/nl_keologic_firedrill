import CheckIcon from '@material-ui/icons/CheckCircle';
import blueGrey from 'material-ui/colors/blueGrey';
import * as React from 'react';
import { NavigationTabScreenOptions, StackNavigator } from 'react-navigation';
import { Routes } from '../../config/routes';
import Checklist from '../pages/Checklist';
import ChecklistDetail from '../pages/ChecklistDetail';

const Nav = StackNavigator(
    {
        [Routes.Checklist]: Checklist,
        [Routes.ChecklistDetail]: ChecklistDetail
    },
    {
        headerMode: 'none'
    }
);

export default class ClassesNavigator extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
            return (
                <CheckIcon style={{ height: 20, width: 20, color: focused ? blueGrey[800] : 'rgba(0, 0, 0, 0.26)' }} />
            );
        }
    };

    public render(): JSX.Element {
        return <Nav />;
    }
}
