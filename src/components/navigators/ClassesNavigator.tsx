import * as React from 'react';
import { StackNavigator } from 'react-navigation';
import Classes from '../pages/Classes';
import ClassDetail from '../pages/ClassDetail';

const Nav = StackNavigator({
    Classes: Classes,
    ClassDetail: ClassDetail
});

export default class ClassesNavigator extends React.Component {
    render() {
        return (
            <Nav style={{ flexGrow: 1, display: 'flex', alignSelf: 'stretch', borderWidth: 1 }} />
        );
    }
}