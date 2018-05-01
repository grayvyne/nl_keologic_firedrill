import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import ContentView from '../shared/ContentView';
import { ApplicationServices } from '../../services/ApplicationServices';

interface State {
    index: number;
}

interface Props {
    isVisible: boolean;
}

namespace styles {
    export const toolbar = { alignItems: 'stretch' };
    export const iconButton: React.CSSProperties = { alignSelf: 'center', marginLeft: -10 };
    export const viewStyle: ViewStyle = {
        backgroundColor: 'white',
        display: 'flex',
        flexGrow: 1,
        height: '100%'
    };
    export const hideBoxShadow = { boxShadow: 'none' };
}

export class Checklist extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    public handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    public render(): JSX.Element {
        return (
            <ContentView>
                <AppBar position={'fixed'} style={styles.hideBoxShadow}>
                    <Toolbar style={styles.toolbar}>
                        <IconButton
                            onClick={ApplicationServices.togglePluginMenu}
                            color="inherit"
                            aria-label="Menu"
                            style={styles.iconButton}
                        >
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <View style={styles.viewStyle} />
            </ContentView>
        );
    }
}

export default Checklist;
