import { Button, Typography } from 'material-ui';
import * as React from 'react';
import { Colors } from '../../config/materialUiTheme';
import TableCell from '../shared/TableCell';

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
    export const labelContainer: React.CSSProperties = {
        flex: 1,
        flexDirection: 'column'
    };
    export const label: React.CSSProperties = {
        textAlign: 'left',
        fontWeight: 400,
        fontSize: 16,
        marginBottom: '3px'
    };
    export const subLabel: React.CSSProperties = {
        textAlign: 'left',
        fontWeight: 300,
        color: Colors.SUBTEXT_GREY,
        fontSize: 14
    };
    export const button: React.CSSProperties = {
        borderRadius: 2,
        width: 110
    };
}

/**
 * This renders a table cell with a button on the right hand side
 */
export default class ActionTableCell extends React.Component<Props> {
    public render(): JSX.Element {
        const useSmallFont: React.CSSProperties = this.props.useSmallFont
            ? { fontSize: 10, paddingTop: 2, fontWeight: 600 }
            : {};

        return (
            <TableCell>
                <div style={styles.labelContainer}>
                    <Typography style={styles.label}>{this.props.cellData.label}</Typography>
                    <Typography style={styles.subLabel}>{this.props.cellData.subLabel}</Typography>
                </div>
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
                    <Typography variant="display1" color="inherit" style={useSmallFont}>
                        {this.props.buttonLabel}
                    </Typography>
                </Button>
            </TableCell>
        );
    }
}
