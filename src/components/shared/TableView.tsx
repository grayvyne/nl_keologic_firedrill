import * as React from 'react';
import { View, ViewStyle } from 'react-native';

interface Props {
    style?: ViewStyle;
}
export default class TableView extends React.Component<Props> {
    private style: ViewStyle = { display: 'flex', flexGrow: 1, flexDirection: 'column', backgroundColor: 'white' };

    public render(): JSX.Element {
        const style = this.props.style ? { ...this.props.style, ...this.style } : this.style;
        return <View style={style}>{this.props.children}</View>;
    }
}
