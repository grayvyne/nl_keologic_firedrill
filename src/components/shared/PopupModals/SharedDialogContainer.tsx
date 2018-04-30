import * as React from 'react';
import { Dialog } from 'material-ui';
import { View } from 'react-native';
import { styles } from './sharedStyles';

interface Props {
    open: boolean;
}

export class SharedDialogContainer extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <Dialog open={this.props.open} style={styles.dialogContainer} fullWidth={true}>
                <View>{this.props.children}</View>
            </Dialog>
        );
    }
}
