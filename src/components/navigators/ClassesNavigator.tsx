import PeopleIcon from '@material-ui/icons/People';
import blueGrey from 'material-ui/colors/blueGrey';
import * as React from 'react';
import { NavigationScreenProps, NavigationTabScreenOptions, StackNavigator } from 'react-navigation';
import { Routes } from '../../config/routes';
import ClassDetail from '../pages/ClassDetail';
import Classes from '../pages/Classes';
import { Colors } from '../../config/materialUiTheme';

const Nav = StackNavigator(
    {
        [Routes.Classes]: Classes,
        [Routes.ClassDetail]: ClassDetail
    },
    {
        headerMode: 'none',
        navigationOptions: { header: null }
    }
);

namespace styles {
    export const iconStyle = { height: 28, width: 28 };
}

/**
 * This is the navigator that controls the two states of the MyClasses
 * A. List of classes that the user claimed, Classes
 * B. List of students within a class, ClassDetail
 */
export default class ClassesNavigator extends React.Component {
    static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationTabScreenOptions => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const iconStyle = (isFocused: boolean) => {
                return {
                    ...styles.iconStyle,
                    color: isFocused ? blueGrey[800] : Colors.DISABLED_TAB_ICON
                };
            };

            return <PeopleIcon style={iconStyle(focused)} />;
        }
    });

    public render(): JSX.Element {
        return <Nav />;
    }
}
