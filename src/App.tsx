import { MuiThemeProvider } from 'material-ui/styles';
import { Provider } from 'mobx-react';
import * as React from 'react';
import './App.css';
import { RootTabNav } from './components/navigators/RootTabNav';
import LoadingScreen from './components/pages/LoadingScreen';
import { theme } from './config/materialUiTheme';
import { ChecklistStore, FiredrillStore } from './stores';

namespace styles {
    export const appContainer: React.CSSProperties = {
        height: '100vh'
    };
}

const firedrillStore = new FiredrillStore();
const checklistStore = new ChecklistStore();

/**
 * This is the entry point component
 * It is the top level container for the whole application
 */
class App extends React.Component {
    public render(): JSX.Element {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider firedrillStore={firedrillStore} checklistStore={checklistStore}>
                    <div style={styles.appContainer}>
                        <RootTabNav />
                        <LoadingScreen />
                    </div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
