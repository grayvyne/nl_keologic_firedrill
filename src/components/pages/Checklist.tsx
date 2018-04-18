import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { View } from 'react-native';

interface ChecklistState {
    index: number;
}

interface ChecklistProps {
    isVisible: boolean;
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
            <div>
                <AppBar position={'static'} style={{ boxShadow: 'none' }}>
                    <Toolbar style={{ alignItems: 'stretch' }}>
                        <IconButton color="inherit" aria-label="Menu" style={{ alignSelf: 'center', marginLeft: -10 }}>
                            <AppsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <View>
                    <button onClick={() => (this.props as any).navigation.navigate('ChecklistDetail')}>Test One</button>
                    <button onClick={() => (this.props as any).navigation.navigate('ChecklistDetail')}>Test Two</button>
                    <button onClick={() => (this.props as any).navigation.navigate('ChecklistDetail')}>
                        Test Three
                    </button>
                </View>
            </div>
        );
    }
}

export default Checklist;
