
import { StackRouter, createNavigator } from 'react-navigation';
import ClassDetail from '../pages/ClassDetail';
import Classes from '../pages/Classes';

export const ClassesNavigator = createNavigator(StackRouter({
    Classes: Classes,
    ClassDetail: ClassDetail
}, {}));