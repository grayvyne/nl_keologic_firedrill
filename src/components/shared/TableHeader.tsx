import * as React from 'react';
import { Colors } from '../../config/materialUiTheme';
import TableCell from '../shared/TableCell';

namespace style {
    export const cellStyle: React.CSSProperties = {
        backgroundColor: Colors.TABLE_CELL_GREY,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        paddingRight: 40
    };
}

export default class TableHeader extends React.Component<{ style?: React.CSSProperties }> {
    public render(): JSX.Element {
        return <TableCell style={{ ...style.cellStyle, ...this.props.style }}>{this.props.children}</TableCell>;
    }
}
