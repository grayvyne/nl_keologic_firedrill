import * as React from 'react';
import { ScrollView } from 'react-native';
import { TableView, ClassesTableCell } from '../../shared';
import { FiredrillClass } from '../../../models/FiredrillClass';

interface Props {
    classes: FiredrillClass[];
    onClickClass(classID: number): void;
}

function MyClasses(props: Props) {
    return (
        <ScrollView>
            <TableView>
                {props.classes.map(singleClass => {
                    return (
                        <ClassesTableCell
                            onClick={() => props.onClickClass(singleClass.classID)}
                            key={singleClass.classID}
                            singleClass={singleClass}
                        />
                    );
                })}
            </TableView>
        </ScrollView>
    );
}

export default MyClasses;
