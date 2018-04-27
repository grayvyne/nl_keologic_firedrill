import * as React from 'react';
import { Text } from 'react-native';
import { SharedDialogContainer } from './SharedDialogContainer';
import { CancelOrAffirmDialogFooter } from './CancelOrAffirmDialogFooter';

namespace styles {
    export const titleFont = { fontSize: 16 };
    export const messageFont = { fontSize: 12 };
    export const divider = { marginTop: 10 };
    export const fontStyle = {
        color: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10
    };
}

interface Props {
    open: boolean;
    alertTitle: string;
    alertMessage: string;
    onPressAffirm: () => void;
    onPressCancel: () => void;
    affirmButtonLabel: string;
    cancelButtonLabel: string;
}

export class MaterialAlert extends React.Component<Props, {}> {
    public render(): JSX.Element {
        const { alertTitle, alertMessage, open, ...footerProps } = this.props;

        return (
            <SharedDialogContainer open={this.props.open}>
                <Text style={{ ...styles.fontStyle, ...styles.titleFont }}>{this.props.alertTitle}</Text>
                <Text style={{ ...styles.fontStyle, ...styles.messageFont }}>{this.props.alertMessage}</Text>
                <CancelOrAffirmDialogFooter {...footerProps} />
            </SharedDialogContainer>
        );
    }
}
