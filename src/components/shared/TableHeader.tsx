import * as React from 'react';
import TableCell from '../shared/TableCell';
import { ViewStyle } from 'react-native';

namespace style {
    export const cellStyle: ViewStyle = {
        backgroundColor: '#EEEEEE',
        paddingTop: 10,
        paddingBottom: 10
    };
}

export default class TableHeader extends React.Component {
    public render(): JSX.Element {
        return <TableCell style={style.cellStyle}>{this.props.children}</TableCell>;
    }
}
