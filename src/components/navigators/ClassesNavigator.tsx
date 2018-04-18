import * as React from 'react';
import { StackNavigator, NavigationTabScreenOptions, NavigationScreenProps } from 'react-navigation';
import Classes from '../pages/Classes';
import ClassDetail from '../pages/ClassDetail';
import PeopleIcon from '@material-ui/icons/People';
import blueGrey from 'material-ui/colors/blueGrey';

const Nav = StackNavigator(
    {
        Classes: Classes,
        ClassDetail: ClassDetail
    },
    { headerMode: 'none' }
);

export default class ClassesNavigator extends React.Component {
    static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationTabScreenOptions => ({
        tabBarIcon: ({ focused, tintColor }) => {
            return (
                <PeopleIcon style={{ height: 28, width: 28, color: focused ? blueGrey[800] : 'rgba(0, 0, 0, 0.26)' }} />
            );
        }
    });
    render() {
        return <Nav />;
    }
}
