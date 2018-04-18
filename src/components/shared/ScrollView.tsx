import * as React from 'react';

interface ScrollViewProps {
    containerStyle?: React.CSSProperties;
    style?: React.CSSProperties;
}

export default class ScrollView extends React.Component<ScrollViewProps> {
    render() {
        return (
            <div
                style={{
                    ...{
                        height: '100%',
                        display: 'flex',
                        flexGrow: 1,
                        boxSizing: 'border-box',
                        overflowY: 'scroll'
                    },
                    ...this.props.containerStyle
                }}
            >
                <div style={{ ...{ display: 'flex', width: '100%', height: '100%' }, ...this.props.style }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
