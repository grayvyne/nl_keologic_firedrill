import * as React from 'react';
import { Button } from 'material-ui';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import TableCell from '../shared/TableCell';
import { Colors } from '../../config/materialUiTheme';

interface Props {
    buttonLabel?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    cellData: ActionTableCellData;
    onClick?: () => void;
    useSmallFont?: boolean;
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
        color: Colors.SUBTEXT_GREY,
        fontSize: 14
    };
    export const button: React.CSSProperties = {
        borderRadius: 2,
        width: 110
    };
}

export default class ActionTableCell extends React.Component<Props> {
    public render(): JSX.Element {
        const userSmallFont = this.props.useSmallFont ? { fontSize: 10, lineHeight: 11 } : {};

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
                        <Text style={userSmallFont}>{this.props.buttonLabel}</Text>
                    </Button>
                </View>
            </TableCell>
        );
    }
}
