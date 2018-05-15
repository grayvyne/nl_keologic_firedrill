import * as React from 'react';
import { Colors } from '../../config/materialUiTheme';
import { ClassesStrings } from '../../config/uiConstants';
import { FiredrillClass } from '../../models/FiredrillClass';
import ActionTableCell from './ActionTableCell';
import { getGradeTitleFromGradeLevel } from '../../models/Class';

interface Props {
    claimedByName: string;
    singleClass: FiredrillClass;
    onClick(): void;
}

/**
 * This takes ActionTableCell and gives it properties exclusive to the tablecells that allow you to claim classes
 */
export default class ClaimableClassTableCell extends React.Component<Props> {
    public render(): JSX.Element {
        const { singleClass } = this.props;
        return (
            <ActionTableCell
                cellData={{
                    id: singleClass.classID,
                    label: singleClass.name,
                    subLabel: getGradeTitleFromGradeLevel(singleClass.gradeLevel)
                }}
                key={singleClass.classID}
                buttonTextColor={Colors.CLASS_BUTTON_TEXT}
                isDisabled={null != singleClass.claimedByUserID}
                {...this.buildCellPropsForClass(singleClass)}
            />
        );
    }

    private buildCellPropsForClass(singleClass: FiredrillClass) {
        if (null == singleClass.claimedByUserID) {
            return {
                buttonLabel: ClassesStrings.UNCLAIMED_CLASS,
                buttonColor: Colors.UNCLAIMED_CLASS_BUTTON,
                onClick: this.props.onClick
            };
        }
        return {
            buttonLabel: ClassesStrings.CLAIMED_CLASS(this.props.claimedByName),
            buttonColor: Colors.CLAIMED_CLASS_BUTTON,
            useSmallFont: true
        };
    }
}
