import * as React from 'react';
import { Button } from 'material-ui';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import TableCell from '../shared/TableCell';

interface Props {
    buttonLabel?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    cellData: ActionTableCellData;
    onClick?: () => void;
    isDisabled?: boolean;
}

type ActionTableCellData = {
    id: number;
    label: string;
    subLabel?: string;
};

namespace styles {
    export const labelContainer: ViewStyle = {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column'
    };
    export const label: TextStyle = {
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 16,
        marginBottom: '3px'
    };
    export const subLabel: TextStyle = {
        textAlign: 'left',
        fontWeight: '300',
        color: 'grey'
    };
    export const button: React.CSSProperties = {
        borderRadius: 2,
        width: 110
    };
}

export default class ActionTableCell extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <TableCell>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>{this.props.cellData.label}</Text>
                    <Text style={styles.subLabel}>{this.props.cellData.subLabel}</Text>
                </View>
                <View>
                    <Button
                        variant="raised"
                        style={{
                            ...styles.button,
                            ...{
                                color: this.props.buttonTextColor,
                                backgroundColor: this.props.buttonColor
                            }
                        }}
                        onClick={this.props.onClick}
                        disabled={this.props.isDisabled}
                    >
                        {this.props.buttonLabel}
                    </Button>
                </View>
            </TableCell>
        );
    }
}
