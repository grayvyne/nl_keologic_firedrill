import { MuiThemeProvider } from 'material-ui/styles';
import { Provider } from 'mobx-react';
import * as React from 'react';
import './App.css';
import RootTabNav from './components/navigators/RootTabNav';
import LoadingScreen from './components/pages/LoadingScreen';
import { Colors, theme } from './config/materialUiTheme';
import { ApplicationServices } from './platform';
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
    public componentDidMount(): void {
        ApplicationServices.setBottomBarColor(Colors.TAB_BAR_GREY);
        ApplicationServices.setTopBarColor(Colors.TOP_TAB_BLUE);
    }

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
