import * as React from 'react';
import { Text, Dimensions } from 'react-native';
import { Dialog, DialogActions, Button, Divider } from 'material-ui';
/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */

interface Props {
    open: boolean;
    alertTitle: string;
    alertMessage: string;
    onPressOK: () => void;
    onPressCancel: () => void;
}

export class MaterialAlert extends React.Component<Props, {}> {
    public render(): JSX.Element {
        const fontStyle = {
            color: 'black',
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10,
            marginBottom: 10,
            width: Dimensions.get('window').width - 150
        };

        return (
            <div>
                <Dialog open={this.props.open}>
                    <Text style={{ ...fontStyle, fontSize: 16 }}>{this.props.alertTitle}</Text>

                    <Text style={{ ...fontStyle, fontSize: 12 }}>{this.props.alertMessage}</Text>

                    <Divider style={{ marginTop: 10 }} />
                    <DialogActions>
                        <Button onClick={this.props.onPressCancel} color="primary">
                            CANCEL
                        </Button>
                        <Button onClick={this.props.onPressOK} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
