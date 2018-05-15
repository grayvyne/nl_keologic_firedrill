import * as React from 'react';
import { Animated, Dimensions } from 'react-native';
import { Colors } from '../../config/materialUiTheme';
import { ClassesStrings } from '../../config/uiConstants';
import { getGradeTitleFromGradeLevel } from '../../models/Class';
import { FiredrillClass } from '../../models/FiredrillClass';
import ActionTableCell from './ActionTableCell';

const EXPANDED_HEIGHT = 86;
const EXPANDED_WIDTH = Dimensions.get('window').width;

interface Props {
    claimedByName: string;
    singleClass: FiredrillClass;
    isVisible?: boolean;
    onClick(): void;
}

interface State {
    animationValue: Animated.Value;
}

/**
 * This takes ActionTableCell and gives it properties exclusive to the tablecells that allow you to claim classes
 */
export default class ClaimableClassTableCell extends React.Component<Props, State> {
    public state: State = { animationValue: new Animated.Value(1) };

    public componentWillReceiveProps(nextProps: Props) {
        if (null == nextProps.isVisible) {
            return;
        }
        if (false === nextProps.isVisible && this.props.isVisible) {
            Animated.timing(this.state.animationValue, { toValue: 0, duration: 500 }).start();
        }
    }

    public render(): JSX.Element {
        const { singleClass } = this.props;
        return (
            <Animated.View style={this.buildAnimationStyles()}>
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
            </Animated.View>
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

    private buildAnimationStyles(): {} {
        return {
            transform: [
                {
                    translateX: this.state.animationValue.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [-EXPANDED_WIDTH, -EXPANDED_WIDTH, 0]
                    })
                }
            ],
            height: this.state.animationValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, EXPANDED_HEIGHT, EXPANDED_HEIGHT]
            })
        };
    }
}
