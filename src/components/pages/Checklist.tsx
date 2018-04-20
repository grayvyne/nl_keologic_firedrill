import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import ContentView from '../shared/ContentView';
import { View, ViewStyle, TouchableOpacity, Text } from 'react-native';
import { SingleClass } from './Classes';

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
    data: SingleClass[] = [
        {
            id: 1,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 2,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 3,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        },
        {
            id: 4,
            name: 'Mrs. Smithson',
            grade: '3',
            found: 12,
            total: 24
        }
    ];
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
                <View style={style.viewStyle}>
                    {this.data.map(singleClass => {
                        return (
                            <TouchableOpacity
                                key={singleClass.id}
                                onPress={() => (this.props as any).navigation.navigate('ChecklistDetail')}
                            >
                                <Text>Test One</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ContentView>
        );
    }
}

export default Checklist;
