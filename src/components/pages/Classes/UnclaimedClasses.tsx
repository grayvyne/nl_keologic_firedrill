import * as React from 'react';
import { ScrollView, Text, View, ViewStyle } from 'react-native';
import { ContentView, TableHeader, TableView } from '../../shared';
import AbstractClaimableClassesPage, { AbstractClaimableClassesPageProps } from './AbstractClaimableClassesPage';
import { ClassesStrings } from '../../../config/uiConstants';

interface Props extends AbstractClaimableClassesPageProps {}

namespace style {
    export const headerLeft: ViewStyle = { display: 'flex', flexGrow: 1 };
    export const headerRight: ViewStyle = { marginRight: 25 };
}

class UnclaimedClasses extends AbstractClaimableClassesPage<Props> {
    public render(): JSX.Element {
        return (
            <ContentView>
                <ScrollView>
                    <TableView>
                        <TableHeader>
                            <View style={style.headerLeft}>
                                <Text>{ClassesStrings.UNCLAIMED_HEADING_NAME}</Text>
                            </View>
                            <View style={style.headerRight}>
                                <Text>{ClassesStrings.UNCLAIMED_HEADING_STATUS}</Text>
                            </View>
                        </TableHeader>
                        {this.props.classes.map(this.renderTableCell)}
                    </TableView>
                </ScrollView>
            </ContentView>
        );
    }
}

export default UnclaimedClasses;
