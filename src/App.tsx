import { MuiThemeProvider } from 'material-ui/styles';
import { Provider, observer } from 'mobx-react';
import * as React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import './App.css';
import { RootTabNav } from './components/navigators/RootTabNav';
import { ApplicationServices } from './services/ApplicationServices';
import { SchoolServices } from './services/SchoolServices';
import { FiredrillStore, PlatformBridge } from './stores';
import { theme } from './config/materialUiTheme';

namespace styles {
    export const counter: ViewStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'red'
    };
    export const appContainer: ViewStyle = {
        height: '100vh',
        width: '100vw'
    };
}

const bridge = new PlatformBridge();
ApplicationServices.init(bridge);
SchoolServices.init(bridge);

const firedrillStore = new FiredrillStore();

// TEMP DEV UI ELEMENT
const Counter = observer(() => (
    <View style={styles.counter}>
        <Text>{bridge.sendCount}</Text>
        <Text>{bridge.responseCount}</Text>
        <Text>{bridge.numQueuedMessages}</Text>
    </View>
));
// END TEMP DEV UI ELEMENT

class App extends React.Component {
    public render(): JSX.Element {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider firedrillStore={firedrillStore}>
                    <View style={styles.appContainer}>
                        <RootTabNav />
                        <Counter />
                    </View>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
