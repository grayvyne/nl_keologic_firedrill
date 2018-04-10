import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import './App.css';
import { createTabNavigator } from './TabNavigator';
import { PlatformBridge, PlatformBridgeCallType } from './stores/PlatformBridge';
import { Tabs, Tab, AppBar } from 'material-ui';

const logo = require('./logo.svg');

const bridge = new PlatformBridge();
// bridge.makeCall('{"type": "is_anyone_listening"}').then(() => (console = bridge));

class Home extends React.Component<{}, { currentRoute: number }> {
    public state = { currentRoute: 0 };

    public render() {
        return (
            <div>
                <AppBar onLeftIconButtonClick={() => bridge.makeCall(PlatformBridgeCallType.TogglePluginsMenu, {})}>
                    <Tabs initialSelectedIndex={0} style={{ width: '100%' }} onChange={(a, b, c) => console.log(a)}>
                        <Tab
                            onClick={() => {
                                console.log('Setting state to 0');
                                this.setState({ currentRoute: 0 });
                            }}
                            label="1"
                        />
                        <Tab onClick={() => this.setState({ currentRoute: 1 })} label="2" />
                    </Tabs>
                </AppBar>
                <div
                    className="App"
                    style={{
                        position: 'absolute',
                        top: 50,
                        bottom: 50,
                        left: 0,
                        right: 0,
                        display: this.state.currentRoute === 0 ? 'block' : 'none'
                    }}
                >
                    <div
                        style={{
                            height: window.innerHeight - 100,
                            overflowY: 'scroll'
                        }}
                    >
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">Welcome to React</h1>
                        </header>
                        <p className="App-intro">
                            tslint:disable-next-line:max-line-length To get started, edit <code>src/App.tsx</code> and
                            save to reload YOUR DREW FACE.
                        </p>
                        <button
                            onClick={() =>
                                bridge
                                    .makeCall(PlatformBridgeCallType.TogglePluginsMenu)
                                    .then(() => console.log('Got a bridge response'))
                            }
                        >
                            <p>Menu</p>
                        </button>
                    </div>
                </div>
                <div
                    className="App"
                    style={{
                        position: 'absolute',
                        top: 50,
                        bottom: 50,
                        left: 0,
                        right: 0,
                        display: this.state.currentRoute === 1 ? 'block' : 'none'
                    }}
                >
                    <h1>Hey</h1>
                </div>
            </div>
        );
    }
}

const TabNav = createTabNavigator({
    Home: Home,
    Emoh: () => (
        <div
            style={{
                height: window.innerHeight - 100,
                overflowY: 'scroll'
            }}
        >
            <h1>WHAAAT</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
        </div>
    )
});

// class App extends React.Component<{}, { index: number }> {
//     public state = { index: 0 };

//     componentDidMount() {
//         window.addEventListener('scroll', this.handleScroll);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('scroll', this.handleScroll);
//     }

//     handleScroll = (event: Event) => {
//         this.setState({});
//         // tslint:disable-next-line:semicolon
//     };

//     render() {
//         return (
//             <MuiThemeProvider>
//                 <div
//                     style={{
//                         position: 'absolute',
//                         top: 0,
//                         right: 0,
//                         bottom: 0,
//                         left: 0,
//                         overflow: 'hidden'
//                     }}
//                 >
//                     <div
//                         className="App"
//                         style={{
//                             position: 'absolute',
//                             top: 0,
//                             bottom: 50,
//                             left: 0,
//                             right: 0,
//                             display: this.state.index === 0 ? 'block' : 'none'
//                         }}
//                     >

//                     </div>

//                     <BottomNavigation
//                         style={{ position: 'absolute', right: 0, left: 0, bottom: 0, height: 50 }}
//                         selectedIndex={this.state.index}
//                     >
//                         <BottomNavigationItem
//                             onClick={() => this.setState({ index: 0 })}
//                             icon={
//                                 <img
//                                     src={logo}
//                                     className="App-logo"
//                                     alt="logo"
//                                     style={{ height: '20px', width: '20px' }}
//                                 />
//                                 // tslint:disable-next-line:jsx-curly-spacing
//                             }
//                             label="A"
//                         />
//                         <BottomNavigationItem
//                             onClick={() => this.setState({ index: 1 })}
//                             icon={
//                                 <img
//                                     src={logo}
//                                     className="App-logo"
//                                     alt="logo"
//                                     style={{ height: '20px', width: '20px' }}
//                                 />
//                                 // tslint:disable-next-line:jsx-curly-spacing
//                             }
//                             label="B"
//                         />
//                     </BottomNavigation>
//                 </div>
//             </MuiThemeProvider>
//         );
//     }
// }

class App extends React.Component<{}, { index: number }> {
    render() {
        return (
            <MuiThemeProvider>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        overflow: 'hidden'
                    }}
                >
                    <TabNav />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
