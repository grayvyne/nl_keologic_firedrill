import * as React from 'react';
import { ScrollView, Text, View, ViewStyle } from 'react-native';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ActionTableCell, TableHeader, TableView, ContentView } from '../../shared';
import { FindClassesStrings as ui } from '../../../config/uiConstants';
import { getGradeTitleFromGradeLevel } from '../../../models/Class';
import { Colors } from '../../../config/materialUiTheme';

interface Props {
    classes: FiredrillClass[];
}

namespace style {
    export const headerLeft: ViewStyle = { display: 'flex', flexGrow: 1 };
    export const headerRight: ViewStyle = { marginRight: 25 };
}

function UnclaimedClasses(props: Props) {
    return (
        <ContentView>
            <ScrollView>
                <TableView>
                    <TableHeader>
                        <View style={style.headerLeft}>
                            <Text>Class</Text>
                        </View>
                        <View style={style.headerRight}>
                            <Text>Status</Text>
                        </View>
                    </TableHeader>
                    {props.classes.map(singleClass => {
                        return (
                            <ActionTableCell
                                cellData={{
                                    id: singleClass.classID,
                                    label: singleClass.name,
                                    subLabel: getGradeTitleFromGradeLevel(singleClass.gradeLevel)
                                }}
                                key={singleClass.classID}
                                buttonLabel={ui.UNCLAIMED_CLASS}
                                buttonColor={Colors.CLAIM_CLASS_BUTTON}
                                buttonTextColor={'white'}
                            />
                        );
                    })}
                </TableView>
            </ScrollView>
        </ContentView>
    );
}

export default UnclaimedClasses;
