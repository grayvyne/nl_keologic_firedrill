import teal from 'material-ui/colors/teal';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import RightArrow from '../../assets/RightArrow';
import { FiredrillClass } from '../../models/FiredrillClass';

namespace style {
    export const cellContainer: ViewStyle = { padding: 0, height: 'unset' };
    export const touchableHighlight: ViewStyle = {
        width: '100%',
        height: '100%',
        padding: 0
    };
    export const highlightWrapper: ViewStyle = {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center'
    };
    export const labelContainer: ViewStyle = {
        display: 'flex',
        flexGrow: 1
    };
    export const label: ViewStyle = {
        marginBottom: 3
    };
    export const labelText: TextStyle = {
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 16
    };
    export const subLabelText: TextStyle = {
        textAlign: 'left',
        fontWeight: '300',
        color: 'grey'
    };
    export const classCountText: TextStyle = {
        paddingLeft: 50,
        paddingRight: 20,
        color: teal[400],
        fontSize: 24,
        fontWeight: '300'
    };
    export const rightArrowContainer: ViewStyle = {
        height: 10,
        width: 6,
        marginRight: 0,
        marginTop: -4
    };
}

interface ClassesTableCellProps {
    singleClass: FiredrillClass;
    onClick: () => void;
}

@observer
export default class ClassesTableCell extends React.Component<ClassesTableCellProps> {
    render() {
        const { singleClass } = this.props;
        if (undefined === singleClass) {
            return null;
        }
        return (
            <View key={singleClass.classID} style={style.cellContainer}>
                <TouchableOpacity onPress={this.props.onClick} style={style.touchableHighlight}>
                    <View style={style.highlightWrapper}>
                        <View style={style.labelContainer}>
                            <View style={style.label}>
                                <Text style={style.labelText}>{singleClass.name}</Text>
                            </View>
                            <View>
                                <Text style={style.subLabelText}>Grade {singleClass.gradeLevel}</Text>
                            </View>
                        </View>

                        <Text style={style.classCountText}>
                            {singleClass.foundStudents}/{singleClass.totalStudents}
                        </Text>
                        <View style={style.rightArrowContainer}>
                            <RightArrow height={10} width={6} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
