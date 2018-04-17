import { BottomNavigationAction, withStyles } from 'material-ui';
import { BottomNavigationActionProps } from 'material-ui/BottomNavigation';
import * as React from 'react';

const styles = {
    root: {
        color: 'rgba(0, 0, 0, 0.3)'
    },
    selected: {
        color: '#37474F'
    }
};

function bottomNavigationAction(props: BottomNavigationActionProps) {
    return (
        <BottomNavigationAction {...props} showLabel={props.showLabel}>
            {props.children}
        </BottomNavigationAction>
    );
}

const StyledBottomNavigationAction = withStyles(styles)(bottomNavigationAction);

export default StyledBottomNavigationAction;
