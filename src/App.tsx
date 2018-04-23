import blueGrey from 'material-ui/colors/blueGrey';
import lightBlue from 'material-ui/colors/lightBlue';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Provider, observer } from 'mobx-react';
import * as React from 'react';
import { View, Text } from 'react-native';
import './App.css';
import { RootTabNav } from './components/navigators/RootTabNav';
// import { PlatformBridge, PlatformBridgeCallType } from './stores/PlatformBridge';
import { ApplicationServices } from './services/ApplicationServices';
import { SchoolServices } from './services/SchoolServices';
import { FiredrillStore, PlatformBridge } from './stores';

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

const bridge = new PlatformBridge();
ApplicationServices.init(bridge);
SchoolServices.init(bridge);

const fdStore = new FiredrillStore();

ApplicationServices.log(fdStore);

const Counter = observer(() => (
    <View
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 20,
            height: 20,
            borderColor: 'red',
            borderWidth: 1,
            backgroundColor: 'red'
        }}
    >
        <Text>{bridge.sendCount}</Text>
        <Text>{bridge.responseCount}</Text>
        <Text>{bridge.numQueuedMessages}</Text>
    </View>
));

class App extends React.Component {
    public render(): JSX.Element {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider firedrillStore={fdStore}>
                    <View style={{ height: '100vh', width: '100vw' }}>
                        <RootTabNav />
                        <Counter />
                    </View>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
