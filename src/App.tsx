import lightBlue from 'material-ui/colors/lightBlue';
import orange from 'material-ui/colors/orange';
import blueGrey from 'material-ui/colors/blueGrey';
import red from 'material-ui/colors/red';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import * as React from 'react';
import './App.css';
// import { PlatformBridge, PlatformBridgeCallType } from './stores/PlatformBridge';
import { View } from 'react-native';
import { RootTabNav } from './components/navigators/RootTabNav';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: lightBlue[300],
            main: lightBlue[500],
            dark: lightBlue[700],
            contrastText: '#fff'
        },
        secondary: {
            light: blueGrey[800],
            main: red[400],
            dark: blueGrey[800],
            contrastText: '#fff'
        },
        error: orange
    }
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <View style={{ height: '100vh', width: '100vw' }}>
                    <RootTabNav />
                </View>
            </MuiThemeProvider>
        );
    }
}

export default App;
