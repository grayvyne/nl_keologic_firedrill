import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import ContentView from '../shared/ContentView';

interface State {
    index: number;
}

interface Props {
    isVisible: boolean;
}

namespace style {
    export const viewStyle: ViewStyle = {
        backgroundColor: 'white',
        display: 'flex',
        flexGrow: 1,
        height: '100%'
    };
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

    public render(): JSX.Element {
        return (
            <ContentView>
                <AppBar position={'fixed'} style={{ boxShadow: 'none' }}>
                    <Toolbar style={{ alignItems: 'stretch' }}>
                        <IconButton color="inherit" aria-label="Menu" style={{ alignSelf: 'center', marginLeft: -10 }}>
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <View style={style.viewStyle} />
            </ContentView>
        );
    }
}

export default Checklist;
