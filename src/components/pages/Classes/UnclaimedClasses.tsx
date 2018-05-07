import { Typography } from 'material-ui';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { ClassesStrings } from '../../../config/uiConstants';
import { ContentView, TableHeader, TableView } from '../../shared';
import AbstractClaimableClassesPage, { AbstractClaimableClassesPageProps } from './AbstractClaimableClassesPage';

interface Props extends AbstractClaimableClassesPageProps {}

class UnclaimedClasses extends AbstractClaimableClassesPage<Props> {
    public render(): JSX.Element {
        return (
            <ContentView>
                <ScrollView>
                    <TableView>
                        <TableHeader>
                            <Typography variant="body2">{ClassesStrings.UNCLAIMED_HEADING_NAME}</Typography>
                            <Typography variant="body2">{ClassesStrings.UNCLAIMED_HEADING_STATUS}</Typography>
                        </TableHeader>
                        {this.props.classes.map(this.renderTableCell)}
                    </TableView>
                </ScrollView>
            </ContentView>
        );
    }
}

export default UnclaimedClasses;
