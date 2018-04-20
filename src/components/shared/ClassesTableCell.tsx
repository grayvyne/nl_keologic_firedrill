import * as React from 'react';
import RightArrow from '../../assets/RightArrow';
import { SingleClass } from '../pages/Classes';
import teal from 'material-ui/colors/teal';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import TableCell from '../shared/TableCell';

namespace style {
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
            <TableCell onClick={this.props.onClick}>
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
            </TableCell>
        );
    }
}
