import * as React from 'react';
import { View, ViewStyle } from 'react-native';

export default class TableView extends React.Component {
    private style: ViewStyle = { display: 'flex', flexGrow: 1, flexDirection: 'column' };

    public render(): JSX.Element {
        return <View style={this.style}>{this.props.children}</View>;
    }
}
