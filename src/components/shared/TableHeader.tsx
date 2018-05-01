import * as React from 'react';
import TableCell from '../shared/TableCell';
import { ViewStyle } from 'react-native';
import { Colors } from '../../config/materialUiTheme';

namespace style {
    export const cellStyle: ViewStyle = {
        backgroundColor: Colors.TABLE_CELL_GREY,
        paddingTop: 10,
        paddingBottom: 10
    };
}

export default class TableHeader extends React.Component {
    public render(): JSX.Element {
        return <TableCell style={style.cellStyle}>{this.props.children}</TableCell>;
    }
}
