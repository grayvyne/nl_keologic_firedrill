// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { AppRegistry } from 'react-native';

// ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });

registerServiceWorker();
