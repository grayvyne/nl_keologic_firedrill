import * as React from 'react';
import { DialogActions, Button, Divider } from 'material-ui';
import { styles } from './sharedStyles';

interface Props {
    onPressAffirm: () => void;
    onPressCancel: () => void;
    affirmButtonLabel: string;
    cancelButtonLabel: string;
}

export const CancelOrAffirmDialogFooter = (props: Props) => {
    return (
        <div>
            <Divider style={styles.divider} />
            <DialogActions style={styles.marginRight}>
                <Button onClick={props.onPressCancel} color="primary">
                    {props.cancelButtonLabel}
                </Button>
                <Button onClick={props.onPressAffirm} color="primary">
                    {props.affirmButtonLabel}
                </Button>
            </DialogActions>
        </div>
    );
};
