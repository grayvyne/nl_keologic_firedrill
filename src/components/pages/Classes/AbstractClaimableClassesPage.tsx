import * as React from 'react';
import { FiredrillClass } from '../../../models/FiredrillClass';
import { ClaimableClassTableCell } from '../../shared';

export interface AbstractClaimableClassesPageProps {
    classes: FiredrillClass[];
    getClaimedByNameForClass(aClass: FiredrillClass): string;
    onPressClaim(classID: number): Promise<void>;
}

export default class AbstractClaimableClassesPage<P extends AbstractClaimableClassesPageProps> extends React.Component<
    P
> {
    protected renderTableCell = (singleClass: FiredrillClass): JSX.Element => {
        return (
            <ClaimableClassTableCell
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
