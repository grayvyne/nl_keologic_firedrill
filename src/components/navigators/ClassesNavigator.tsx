import PeopleIcon from '@material-ui/icons/People';
import blueGrey from 'material-ui/colors/blueGrey';
import * as React from 'react';
import { NavigationScreenProps, NavigationTabScreenOptions, StackNavigator } from 'react-navigation';
import { Routes } from '../../config/routes';
import ClassDetail from '../pages/ClassDetail';
import Classes from '../pages/Classes';

const Nav = StackNavigator(
    {
        [Routes.Classes]: Classes,
        [Routes.ClassDetail]: ClassDetail
    },
    {
        headerMode: 'none'
    }
);

export default class ClassesNavigator extends React.Component {
    static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationTabScreenOptions => ({
        tabBarIcon: ({ focused, tintColor }) => {
            return (
                <PeopleIcon style={{ height: 28, width: 28, color: focused ? blueGrey[800] : 'rgba(0, 0, 0, 0.26)' }} />
            );
        }
    });

    public render(): JSX.Element {
        return <Nav />;
    }
}
