import * as React from 'react';
import { TouchableOpacity, ViewStyle, View } from 'react-native';

interface TableCellProps {
    height?: number | string;
    style?: ViewStyle;
    onClick?: () => void;
}

namespace style {
    export const cellContainerStyle: ViewStyle = {
        width: '100%',
        padding: 0
    };
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
}

export default class TableCell extends React.Component<TableCellProps> {
    render() {
        return (
            <View style={{ ...style.cellContainerStyle, ...{ height: this.props.height } }}>
                <TouchableOpacity onPress={this.props.onClick} style={style.touchableHighlight}>
                    <View style={{ ...style.highlightWrapper, ...this.props.style }}>{this.props.children}</View>
                </TouchableOpacity>
            </View>
        );
    }
}
