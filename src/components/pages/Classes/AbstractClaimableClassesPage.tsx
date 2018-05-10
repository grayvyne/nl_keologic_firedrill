import * as React from 'react';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ClaimableClassTableCell } from '../../shared';

export interface AbstractClaimableClassesPageProps {
    classes: FiredrillClass[];
    getClaimedByNameForClass(aClass: FiredrillClass): string;
    onPressClaim(classID: number): Promise<void>;
}

/**
 * This abstract class gives a function to render a table cell that provides functionality to claim a class by a teacher
 */
export default class AbstractClaimableClassesPage<P extends AbstractClaimableClassesPageProps> extends React.Component<
    P
> {
    protected renderTableCell = (singleClass: FiredrillClass): JSX.Element => {
        return (
            <ClaimableClassTableCell
                key={singleClass.classID}
                singleClass={singleClass}
                claimedByName={this.props.getClaimedByNameForClass(singleClass)}
                onClick={this.handlePressClaim(singleClass.classID)}
            />
        );
    };

    private handlePressClaim(classID: number): () => void {
        return () => this.props.onPressClaim(classID);
    }
}
