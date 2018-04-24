import CheckIcon from '@material-ui/icons/CheckCircle';
import blueGrey from 'material-ui/colors/blueGrey';
import * as React from 'react';
import { NavigationTabScreenOptions, StackNavigator } from 'react-navigation';
import { Routes } from '../../config/routes';
import Checklist from '../pages/Checklist';
import ChecklistDetail from '../pages/ChecklistDetail';
import { Colors } from '../../config/materialUiTheme';

const Nav = StackNavigator(
    {
        [Routes.Checklist]: Checklist,
        [Routes.ChecklistDetail]: ChecklistDetail
    },
    {
        headerMode: 'none'
    }
);

namespace styles {
    export const iconStyle = {
        height: 20,
        width: 20
    };
}

export default class ClassesNavigator extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
            const iconStyle = (isFocused: boolean) => {
                return {
                    ...styles.iconStyle,
                    color: focused ? blueGrey[800] : Colors.DISABLED_TAB_ICON
                };
            };

            return <CheckIcon style={iconStyle(focused)} />;
        }
    };

    public render(): JSX.Element {
        return <Nav />;
    }
}
