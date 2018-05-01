import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { Colors } from '../../config/materialUiTheme';

interface Props {
    containerStyle?: ViewStyle;
    style?: ViewStyle;
}

namespace style {
    export const contentWrapperStyle: ViewStyle = {
        height: '100vh',
        paddingTop: 56,
        paddingBottom: 56,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: Colors.BACKGROUND
    };
    export const contentStyle: ViewStyle = { width: '100%', height: '100%' };
}

export default class ContentView extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <View
                style={{
                    ...style.contentWrapperStyle,
                    ...this.props.containerStyle
                }}
            >
                <View style={{ ...style.contentStyle, ...this.props.style }}>{this.props.children}</View>
            </View>
        );
    }
}
