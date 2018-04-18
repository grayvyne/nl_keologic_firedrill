import * as React from 'react';
import { StackNavigator, NavigationTabScreenOptions } from 'react-navigation';
import Checklist from '../pages/Checklist';
import ChecklistDetail from '../pages/ChecklistDetail';
import CheckIcon from '@material-ui/icons/CheckCircle';
import blueGrey from 'material-ui/colors/blueGrey';

const Nav = StackNavigator(
    {
        Checklist: Checklist,
        ChecklistDetail: ChecklistDetail
    },
    { headerMode: 'none' }
);

export default class ClassesNavigator extends React.Component {
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({ focused, tintColor }) => {
            return (
                <CheckIcon style={{ height: 20, width: 20, color: focused ? blueGrey[800] : 'rgba(0, 0, 0, 0.26)' }} />
            );
        }
    };
    render() {
        return <Nav />;
    }
}
