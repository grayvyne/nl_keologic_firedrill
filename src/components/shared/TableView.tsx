import * as React from 'react';
import { ScrollView, ViewStyle } from 'react-native';

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

/**
 * This is our table view component, it uses react-natives scroll view instead of a <div> with scrolling properties
 * This helps with performance and the TableView should be used in all multi-content scrolling situations
 */
export default class TableView extends React.Component<Props> {
    public render(): JSX.Element {
        const style = { ...styles.tableStyle, ...this.props.style } as ViewStyle;
        return <ScrollView style={style}>{this.props.children}</ScrollView>;
    }
}
