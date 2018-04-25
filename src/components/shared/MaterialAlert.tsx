import * as React from 'react';
import { Text, Dimensions } from 'react-native';
import { Dialog, DialogActions, Button, Divider } from 'material-ui';

namespace styles {
    export const titleFont = { fontSize: 16 };
    export const messageFont = { fontSize: 12 };
    export const divider = { marginTop: 10 };
    export const fontStyle = {
        color: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10,
        width: Dimensions.get('window').width - 150
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

        return (
            <div>
                <Dialog open={this.props.open}>
                    <Text style={{ ...styles.fontStyle, ...styles.titleFont}}>{this.props.alertTitle}</Text>

                    <Text style={{ ...styles.fontStyle, ...styles.messageFont}}>{this.props.alertMessage}</Text>

                    <Divider style={styles.divider} />
                    <DialogActions>
                        <Button onClick={() => this.props.onPressCancel()} color="primary">
                            {this.props.cancelButtonLabel}
                        </Button>
                        <Button onClick={() => this.props.onPressAffirm()} color="primary">
                            {this.props.affirmButtonLabel}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
