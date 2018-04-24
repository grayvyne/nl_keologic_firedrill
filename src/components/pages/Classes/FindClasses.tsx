import * as React from 'react';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ScrollView } from 'react-native';
import { TableView, ActionTableCell, SearchBar } from '../../shared';
import { FindClassesStrings as ui } from '../../../config/uiConstants';
import { Colors } from '../../../config/materialUiTheme';

interface Props {
    classes: FiredrillClass[];
    onPressClaim(classID: number): Promise<void>;
}

class FindClasses extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <ScrollView>
                <SearchBar />
                <TableView>{this.props.classes.map(this.renderTableCell)}</TableView>
            </ScrollView>
        );
    }

    private handlePressClaim(classID: number): () => void {
        return () => this.props.onPressClaim(classID);
    }

    private buildCellPropsForClass(singleClass: FiredrillClass) {
        const claimedProps = {
            buttonLabel: ui.CLAIMED_CLASS(singleClass.claimedByName),
            buttonColor: Colors.CLAIMED_CLASS_BUTTON
        };

        const unclaimedProps = {
            buttonLabel: ui.UNCLAIMED_CLASS,
            buttonColor: Colors.UNCLAIMED_CLASS_BUTTON,
            onClick: this.handlePressClaim(singleClass.classID)
        };

        const cellProps = singleClass.claimedByID ? claimedProps : unclaimedProps;

        return cellProps;
    }

    private renderTableCell = (singleClass: FiredrillClass): JSX.Element => {
        return (
            <ActionTableCell
                cellData={{
                    id: singleClass.classID,
                    label: singleClass.name,
                    subLabel: singleClass.gradeLevel.toString()
                }}
                key={singleClass.classID}
                buttonTextColor={Colors.CLASS_BUTTON_TEXT}
                {...this.buildCellPropsForClass(singleClass)}
            />
        );
    };
}

export default FindClasses;
