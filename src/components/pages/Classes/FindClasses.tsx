import * as React from 'react';
import { ScrollView } from 'react-native';
import { Colors } from '../../../config/materialUiTheme';
import { FindClassesStrings as ui } from '../../../config/uiConstants';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ActionTableCell, SearchBar, TableView } from '../../shared';
import { getGradeTitleFromGradeLevel } from '../../../models/Class';

interface Props {
    classes: FiredrillClass[];
    searchTerm: string;
    onChangeSearchTerm(term: string): void;
    getClaimedByNameForClass(aClass: FiredrillClass): string;
    onPressClaim(classID: number): Promise<void>;
}

class FindClasses extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <ScrollView>
                <SearchBar text={this.props.searchTerm} onChangeText={this.props.onChangeSearchTerm} />
                <TableView>{this.props.classes.map(this.renderTableCell)}</TableView>
            </ScrollView>
        );
    }

    private handlePressClaim(classID: number): () => void {
        return () => this.props.onPressClaim(classID);
    }

    private buildCellPropsForClass(singleClass: FiredrillClass) {
        const claimedProps = {
            buttonLabel: ui.CLAIMED_CLASS(this.props.getClaimedByNameForClass(singleClass)),
            buttonColor: Colors.CLAIMED_CLASS_BUTTON,
            overrideFontSize: true
        };

        const unclaimedProps = {
            buttonLabel: ui.UNCLAIMED_CLASS,
            buttonColor: Colors.UNCLAIMED_CLASS_BUTTON,
            onClick: this.handlePressClaim(singleClass.classID)
        };

        const cellProps = singleClass.claimedByUserID ? claimedProps : unclaimedProps;

        return cellProps;
    }

    private renderTableCell = (singleClass: FiredrillClass): JSX.Element => {
        return (
            <ActionTableCell
                cellData={{
                    id: singleClass.classID,
                    label: singleClass.name,
                    subLabel: getGradeTitleFromGradeLevel(singleClass.gradeLevel)
                }}
                key={singleClass.classID}
                buttonTextColor={Colors.CLASS_BUTTON_TEXT}
                {...this.buildCellPropsForClass(singleClass)}
            />
        );
    };
}

export default FindClasses;
