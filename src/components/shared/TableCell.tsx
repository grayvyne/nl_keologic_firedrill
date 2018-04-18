import * as React from 'react';

interface TableCellProps {
    height?: number | string;
    style?: React.CSSProperties;
}

export default class TableCell extends React.Component<TableCellProps> {
    render() {
        return <div style={{ ...this.props.style, ...{ height: this.props.height } }}>{this.props.children}</div>;
    }
}
