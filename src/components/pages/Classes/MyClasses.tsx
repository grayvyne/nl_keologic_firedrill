import { Button, Typography } from 'material-ui';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { Colors } from '../../../config/materialUiTheme';
import { MyClassesStrings as ui } from '../../../config/uiConstants';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ClassesTableCell, ContentView, TableView } from '../../shared';

interface Props {
    classes: FiredrillClass[];
    onClickClass(classID: number): void;
    onClickFindClass(): void;
}

namespace styles {
    export const fullScreen: React.CSSProperties = {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    };

    export const findAClassButton: React.CSSProperties = {
        height: 45,
        backgroundColor: Colors.FIND_A_CLASS,
        width: '80%',
        borderRadius: 3
    };

    export const findAClassButtonText: React.CSSProperties = {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold'
    };

    export const noClassesText: React.CSSProperties = {
        marginBottom: 15
    };
}

function MyClasses(props: Props) {
    if (props.classes.length === 0) {
        return (
            <div style={styles.fullScreen}>
                <Typography variant="body2" style={styles.noClassesText}>
                    {ui.NO_CLASSES_WARNING}
                </Typography>
                <Button style={styles.findAClassButton} onClick={props.onClickFindClass}>
                    <Typography variant="body2" style={styles.findAClassButtonText}>
                        {ui.FIND_A_CLASS}
                    </Typography>
                </Button>
            </div>
        );
    }

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
