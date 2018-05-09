import { Typography } from 'material-ui';
import * as React from 'react';
import { ClassesStrings } from '../../../config/uiConstants';
import { ContentView, TableHeader, TableView } from '../../shared';
import AbstractClaimableClassesPage, { AbstractClaimableClassesPageProps } from './AbstractClaimableClassesPage';

interface Props extends AbstractClaimableClassesPageProps {}

/**
 * This page renders a list of unclaimed classes
 */
class UnclaimedClasses extends AbstractClaimableClassesPage<Props> {
    public render(): JSX.Element {
        return (
            <ContentView>
                <TableHeader>
                    <Typography variant="display1">{ClassesStrings.UNCLAIMED_HEADING_NAME}</Typography>
                    <Typography variant="display1">{ClassesStrings.UNCLAIMED_HEADING_STATUS}</Typography>
                </TableHeader>
                <TableView>{this.props.classes.map(this.renderTableCell)}</TableView>
            </ContentView>
        );
    }
}

export default UnclaimedClasses;
