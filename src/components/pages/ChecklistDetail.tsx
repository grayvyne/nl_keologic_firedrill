import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Toolbar } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ViewStyle, View, Text } from 'react-native';

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

export class ChecklistDetail extends React.Component<Props & NavigationScreenProps> {
    public render(): JSX.Element {
        return (
            <View style={style.viewStyle}>
                <AppBar position={'fixed'} style={{ boxShadow: 'none' }}>
                    <Toolbar style={{ alignItems: 'stretch' }}>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            style={{ alignSelf: 'center', marginLeft: -10 }}
                            onClick={() => this.props.navigation.goBack()}
                        >
                            <BackIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <View>
                    <Text>Test One</Text>
                    <Text>Test Two</Text>
                    <Text>Test Three</Text>
                </View>
            </View>
        );
    }
}

export default ChecklistDetail;
