import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import ContentView from '../shared/ContentView';

interface ChecklistState {
    index: number;
}

interface ChecklistProps {
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

export class Checklist extends React.Component<ChecklistProps, ChecklistState> {
    constructor(props: ChecklistProps) {
        super(props);
        this.state = {
            index: 0
        };
    }

    handleChange = (event: any, index: any) => {
        this.setState({ index });
    };

    render() {
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
