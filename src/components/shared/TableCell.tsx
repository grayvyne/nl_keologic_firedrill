import * as React from 'react';
import { View, ViewStyle, TouchableOpacity, ViewProperties } from 'react-native';

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
        let ContentWrapperComponent: React.ComponentType<ViewProperties> = View;
        let wrapperProps: {} = { style: { ...style.highlightWrapper, ...this.props.style } };
        if (null != this.props.onClick) {
            ContentWrapperComponent = TouchableOpacity;
            wrapperProps = { ...wrapperProps, onPress: this.props.onClick };
        }

        return (
            <View style={{ ...style.cellContainerStyle, ...{ height: this.props.height } }}>
                <ContentWrapperComponent {...wrapperProps}>{this.props.children}</ContentWrapperComponent>
            </View>
        );
    }
}
