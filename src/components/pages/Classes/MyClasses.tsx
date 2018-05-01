import * as React from 'react';
import { ScrollView } from 'react-native';
import { TableView, ClassesTableCell, ContentView } from '../../shared';
import { FiredrillClass } from '../../../models/FiredrillClass';

interface Props {
    classes: FiredrillClass[];
    onClickClass(classID: number): void;
}

function MyClasses(props: Props) {
    return (
        <ContentView>
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
        </ContentView>
    );
}

export default MyClasses;
