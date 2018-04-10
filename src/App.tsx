import * as React from 'react';
import './App.css';
// import { PlatformBridge, PlatformBridgeCallType } from './stores/PlatformBridge';
import { Home } from './Home';

// const logo = require('./logo.svg');

// const bridge = new PlatformBridge();

class App extends React.Component<{}> {
    render() {
        return (
            // <div className="App">
            //     <header className="App-header">
            //         <img src={logo} className="App-logo" alt="logo" />
            //         <h1 className="App-title">Welcome to React</h1>
            //     </header>
            //     <p className="App-intro">
            //         To get started, edit <code>src/App.tsx</code> and save to reload YOUR DREW FACE.
            //     </p>
            //     <button
            //         onClick={() =>
            //             bridge
            //                 .makeCall(PlatformBridgeCallType.TogglePluginsMenu)
            //                 .then(() => bridge.log('Got a bridge response'))
            //         }
            //     >
            //         <p>Menu</p>
            //     </button>
            // </div>
            <Home />
        );
    }
}

export default App;
