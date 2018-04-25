import * as React from 'react';
import { View, ViewStyle } from 'react-native';

namespace styles {
    export const tableStyle: ViewStyle = { 
        display: 'flex', 
        flexGrow: 1, 
        flexDirection: 'column', 
        backgroundColor: 'white' 
    };
}

interface Props {
    style?: ViewStyle;
}

export default class TableView extends React.Component<Props> {

    public render(): JSX.Element {
        const style = this.props.style ? { ...this.props.style, ...styles.tableStyle } : styles.tableStyle;
        return <View style={style}>{this.props.children}</View>;
    }
}
