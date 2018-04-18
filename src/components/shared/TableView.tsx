import * as React from 'react';
import { View, ViewStyle } from 'react-native';

export default class TableView extends React.Component {
    style: ViewStyle = { display: 'flex', flexGrow: 1, flexDirection: 'column' };
    render() {
        return <View style={this.style}>{this.props.children}</View>;
    }
}
