import * as React from 'react';
import RightArrow from '../../assets/RightArrow';
import { SingleClass } from '../pages/Classes';
import teal from 'material-ui/colors/teal';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

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
    singleClass: SingleClass;
    onClick: () => void;
}

export default class ClassesTableCell extends React.Component<ClassesTableCellProps> {
    singleClass = this.props.singleClass;

    render() {
        const { singleClass } = this.props;
        return (
            <View key={singleClass.id} style={style.cellContainer}>
                <TouchableOpacity onPress={this.props.onClick} style={style.touchableHighlight}>
                    <View style={style.highlightWrapper}>
                        <View style={style.labelContainer}>
                            <View style={style.label}>
                                <Text style={style.labelText}>{singleClass.name}</Text>
                            </View>
                            <View>
                                <Text style={style.subLabelText}>Grade {singleClass.grade}</Text>
                            </View>
                        </View>

                        <Text style={style.classCountText}>
                            {singleClass.found}/{singleClass.total}
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
