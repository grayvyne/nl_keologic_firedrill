import * as React from 'react';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ScrollView } from 'react-native';
import { TableView, ActionTableCell, SearchBar } from '../../shared';

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

    private renderTableCell = (singleClass: FiredrillClass): JSX.Element => {
        const cellProps =
            null == singleClass.claimedByID
                ? {
                      buttonLabel: 'Claim',
                      buttonColor: 'green',
                      onClick: this.handlePressClaim(singleClass.classID)
                  }
                : {
                      buttonLabel: 'Claimed By ' + singleClass.claimedByName,
                      buttonColor: 'orange'
                  };
        return (
            <ActionTableCell
                cellData={{
                    id: singleClass.classID,
                    label: singleClass.name,
                    subLabel: singleClass.gradeLevel.toString()
                }}
                key={singleClass.classID}
                buttonTextColor={'white'}
                {...cellProps}
            />
        );
    };
}

export default FindClasses;
