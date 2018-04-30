import * as React from 'react';
import { ScrollView, TouchableOpacity, Text, View, ViewStyle, TextStyle } from 'react-native';
import { TableView, ClassesTableCell } from '../../shared';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { Colors } from '../../../config/materialUiTheme';
import { MyClassesStrings as ui } from '../../../config/uiConstants';

interface Props {
    classes: FiredrillClass[];
    onClickClass(classID: number): void;
    onClickFindClass(): void;
}

namespace styles {
    export const fullScreen: ViewStyle = {
        width: '100%',
        height: '100%',
        paddingTop: '55%'
    };

    export const findAClassButton = {
        height: 45,
        backgroundColor: Colors.FIND_A_CLASS,
        width: '80%',
        marginHorizontal: '10%',
        borderRadius: 3
    };

    export const findAClassButtonText: TextStyle = {
        alignSelf: 'center',
        marginTop: 12,
        color: 'white',
        fontWeight: 'bold'
    };

    export const noClassesText: TextStyle = {
        textAlign: 'center',
        width: '100%',
        marginBottom: 15
    };
}

function MyClasses(props: Props) {
    if (props.classes.length === 0) {
        return (
            <View style={styles.fullScreen}>
                <Text style={styles.noClassesText}>{ui.NO_CLASSES_WARNING}</Text>
                <TouchableOpacity onPress={() => props.onClickFindClass()}>
                    <View style={styles.findAClassButton}>
                        <Text style={styles.findAClassButtonText}>{ui.FIND_A_CLASS}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

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
