import * as React from 'react';
import './App.css';
// import { PlatformBridge, PlatformBridgeCallType } from './stores/PlatformBridge';
import { Root } from './Root';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue';
import red from 'material-ui/colors/red';
import orange from 'material-ui/colors/orange';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: lightBlue[300],
            main: lightBlue[500],
            dark: lightBlue[700],
            contrastText: '#fff'
        },
        secondary: red,
        error: orange
    }
});

class App extends React.Component<{}> {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Root />
            </MuiThemeProvider>
        );
    }
}

export default App;
