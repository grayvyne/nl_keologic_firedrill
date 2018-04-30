import teal from 'material-ui/colors/teal';
import * as React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import RightArrow from '../../assets/RightArrow';
import { FiredrillClass } from '../../models/FiredrillClass';
import TableCell from '../shared/TableCell';
import { observer } from 'mobx-react';

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

interface Props {
    singleClass: FiredrillClass;
    onClick: () => void;
}

@observer
export default class ClassesTableCell extends React.Component<Props> {
    public render(): JSX.Element {
        const { singleClass } = this.props;
        return (
            <TableCell onClick={this.props.onClick}>
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
            </TableCell>
        );
    }
}
