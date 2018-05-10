import { Dialog } from 'material-ui';
import * as React from 'react';
import { styles } from './sharedStyles';

interface Props {
    open: boolean;
}

export class SharedDialogContainer extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <Dialog open={this.props.open} style={styles.dialogContainer} fullWidth={true}>
                <div style={styles.column}>{this.props.children}</div>
            </Dialog>
        );
    }
}
