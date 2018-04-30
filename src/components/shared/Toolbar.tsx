import Toolbar, { ToolbarProps } from 'material-ui/Toolbar';
import * as React from 'react';

const DefaultToolbar: React.SFC<ToolbarProps> = ({ style, children, ...props }) => (
    <Toolbar style={{ ...{ paddingRight: 0, justifyContent: 'space-between' }, ...style }} {...props}>
        {children}
    </Toolbar>
);

export default DefaultToolbar;
