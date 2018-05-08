import * as React from 'react';
import { Colors } from '../../config/materialUiTheme';

interface Props {
    style?: React.CSSProperties;
}

namespace style {
    export const contentWrapperStyle: React.CSSProperties = {
        height: '100vh',
        marginTop: 56,
        marginBottom: 56,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: Colors.BACKGROUND,
        flexDirection: 'column'
    };
}

export default class ContentView extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <div
                style={{
                    ...style.contentWrapperStyle,
                    ...this.props.style
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
