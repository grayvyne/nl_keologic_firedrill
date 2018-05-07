import * as React from 'react';
import { FindClassesStrings } from '../../../config/uiConstants';
import { ContentView, SearchBar, TableView } from '../../shared';
import AbstractClaimableClassesPage, { AbstractClaimableClassesPageProps } from './AbstractClaimableClassesPage';

interface Props extends AbstractClaimableClassesPageProps {
    searchTerm: string;
    onChangeSearchTerm(term: string): void;
}

class FindClasses extends AbstractClaimableClassesPage<Props> {
    public render(): JSX.Element {
        return (
            <ContentView>
                <SearchBar
                    text={this.props.searchTerm}
                    placeholder={FindClassesStrings.SEARCH_PLACEHOLDER}
                    onChangeText={this.props.onChangeSearchTerm}
                />
                <TableView>{this.props.classes.map(this.renderTableCell)}</TableView>
            </ContentView>
        );
    }
}

export default FindClasses;
