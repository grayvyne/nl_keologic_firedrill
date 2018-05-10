import { BottomNavigationAction, withStyles } from 'material-ui';
import { BottomNavigationActionProps } from 'material-ui/BottomNavigation';
import * as React from 'react';
import { Colors } from '../../config/materialUiTheme';

const styles = {
    root: {
        color: 'rgba(0, 0, 0, 0.3)'
    },
    selected: {
        color: Colors.SELECTED_TAB_TINT
    }
};

/**
 * This is the wrapper for bottom navigation actions, it allows you to pass in properties to style your tabs
 * @param props
 */
function bottomNavigationAction(props: BottomNavigationActionProps) {
    return (
        <BottomNavigationAction {...props} showLabel={props.showLabel}>
            {props.children}
        </BottomNavigationAction>
    );
}

const StyledBottomNavigationAction = withStyles(styles)(bottomNavigationAction);

export default StyledBottomNavigationAction;
