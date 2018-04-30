import { observer } from 'mobx-react';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ClassesTableCell, ContentView, TableView } from '../../shared';

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

export default observer(MyClasses);
