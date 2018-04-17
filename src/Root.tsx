import * as React from 'react';
import { RootTabNav } from './components/navigators/RootTabNav';

export default class Root extends React.Component {
    render() {
        return (
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, borderWidth: 1, height: 1000 }}>
                <RootTabNav />
            </div>
        );
    }
}
