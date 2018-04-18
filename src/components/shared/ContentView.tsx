import * as React from 'react';

interface ContentViewProps {
    containerStyle?: React.CSSProperties;
    style?: React.CSSProperties;
}

export default class ContentView extends React.Component<ContentViewProps> {
    render() {
        return (
            <div
                style={{
                    ...{
                        height: '100vh',
                        paddingTop: 56,
                        paddingBottom: 56,
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        width: '100%'
                    },
                    ...this.props.containerStyle
                }}
            >
                <div style={{ ...{ width: '100vw', height: '100%', overflowY: 'scroll' }, ...this.props.style }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
