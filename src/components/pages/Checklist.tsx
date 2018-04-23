import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';

interface State {
    index: number;
}

interface Props {
    isVisible: boolean;
}

namespace styles {
    export const toolbar = { alignItems: 'stretch' };
    export const iconButton: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
}

export class Checklist extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    public handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    public render(): JSX.Element | null {
        if (this.props.isVisible === false) {
            return null;
        }

        return (
            <div>
                <AppBar position={'static'}>
                    <Toolbar style={styles.toolbar}>
                        <IconButton color="inherit" aria-label="Menu" style={styles.iconButton}>
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <SwipeableViews index={this.state.index} onChangeIndex={this.handleChange}>
                    <div>Test One</div>
                    <div>Test Two</div>
                    <div>Test Three</div>
                </SwipeableViews>
            </div>
        );
    }
}

export default Checklist;
