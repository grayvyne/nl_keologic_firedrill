import * as React from 'react';
import { ScrollView } from 'react-native';
import { ContentView, SearchBar, TableView } from '../../shared';
import AbstractClaimableClassesPage, { AbstractClaimableClassesPageProps } from './AbstractClaimableClassesPage';
import { FindClassesStrings } from '../../../config/uiConstants';

interface Props extends AbstractClaimableClassesPageProps {
    searchTerm: string;
    onChangeSearchTerm(term: string): void;
}

class FindClasses extends AbstractClaimableClassesPage<Props> {
    public render(): JSX.Element {
        return (
            <ContentView>
                <ScrollView>
                    <SearchBar
                        text={this.props.searchTerm}
                        placeholder={FindClassesStrings.SEARCH_PLACEHOLDER}
                        onChangeText={this.props.onChangeSearchTerm}
                    />
                    <TableView>{this.props.classes.map(this.renderTableCell)}</TableView>
                </ScrollView>
            </ContentView>
        );
    }
}

export default FindClasses;
