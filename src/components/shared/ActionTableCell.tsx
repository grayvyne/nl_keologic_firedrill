import * as React from 'react';
import { Button } from 'material-ui';

interface ActionTableCellProps {
    buttonLabel?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    cellData: ActionTableCellData;
    onClick?: () => void;
}

type ActionTableCellData = {
    id: number;
    label: string;
    subLabel?: string;
};

export default class ActionTableCell extends React.Component<ActionTableCellProps> {
    render() {
        return (
            <div
                key={this.props.cellData.id}
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 'unset'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: 0,
                        textRendering: 'auto',
                        color: 'initial',
                        letterSpacing: 'normal',
                        wordSpacing: 'normal',
                        textTransform: 'none',
                        textIndent: 0,
                        textShadow: 'none',
                        display: 'inline-block',
                        textAlign: 'start',
                        margin: 0,
                        font: '400 11px system-ui'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexGrow: 1,
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            padding: 0
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexGrow: 1,
                                flexDirection: 'column',
                                padding: 20
                            }}
                        >
                            <div
                                style={{
                                    textAlign: 'left',
                                    fontWeight: 400,
                                    textTransform: 'capitalize',
                                    fontSize: 16,
                                    marginBottom: '3px'
                                }}
                            >
                                {this.props.cellData.label}
                            </div>
                            <div
                                style={{
                                    textAlign: 'left',
                                    fontWeight: 300,
                                    textTransform: 'capitalize',
                                    color: 'grey'
                                }}
                            >
                                {this.props.cellData.subLabel}
                            </div>
                        </div>
                        <div>
                            <Button
                                variant="raised"
                                style={{
                                    borderRadius: 2,
                                    color: this.props.buttonTextColor,
                                    backgroundColor: this.props.buttonColor,
                                    marginRight: 10,
                                    width: 110
                                }}
                                onClick={this.props.onClick}
                            >
                                {this.props.buttonLabel}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
