import { AppBar, Toolbar } from 'material-ui';
import { AppBarProps } from 'material-ui/AppBar';
import * as React from 'react';

namespace styles {
    export const hideBoxShadow = { boxShadow: 'none', borderColor: 'red', borderWidth: 2 };
    export const toolbar = { paddingRight: 0, paddingLeft: 0, justifyContent: 'space-between' };
}

interface Props extends AppBarProps {
    toolbarStyle?: React.CSSProperties;
}

/**
 * Default wrapper for the App bar to give it styles that are shared between all components that use it
 */
const DefaultAppBar: React.SFC<Props> = ({ style, children, toolbarStyle, ...props }) => (
    <AppBar position="absolute" style={{ ...styles.hideBoxShadow, ...style }} {...props}>
        <Toolbar style={{ ...styles.toolbar, ...toolbarStyle }}>{children}</Toolbar>
    </AppBar>
);

export default DefaultAppBar;
