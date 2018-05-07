import * as React from 'react';

namespace styles {
    export const tableStyle: React.CSSProperties = {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    };
}

interface Props {
    style?: React.CSSProperties;
}

export default class TableView extends React.Component<Props> {
    public render(): JSX.Element {
        const style = this.props.style ? { ...this.props.style, ...styles.tableStyle } : styles.tableStyle;
        return <div style={style}>{this.props.children}</div>;
    }
}
