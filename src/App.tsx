import { MuiThemeProvider } from 'material-ui/styles';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import './App.css';
import { RootTabNav } from './components/navigators/RootTabNav';
import LoadingScreen from './components/pages/LoadingScreen';
import { theme } from './config/materialUiTheme';
import { ApplicationServices } from './services/ApplicationServices';
import { SchoolServices } from './services/SchoolServices';
import { ChecklistStore, FiredrillStore, PlatformBridge } from './stores';

namespace styles {
    export const appContainer: ViewStyle = {
        height: '100vh',
        width: '100vw'
    };
}

const bridge = new PlatformBridge();
ApplicationServices.init(bridge);
SchoolServices.init(bridge);

const firedrillStore = new FiredrillStore();
const checklistStore = new ChecklistStore();

class App extends React.Component {
    public render(): JSX.Element {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider firedrillStore={firedrillStore} checklistStore={checklistStore}>
                    <View style={styles.appContainer}>
                        <RootTabNav />
                        <LoadingScreen />
                    </View>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
