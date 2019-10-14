import * as React from 'react';
import { Colors } from '../../config/materialUiTheme';

interface Props {
    style?: React.CSSProperties;
}

namespace style {
    export const contentWrapperStyle: React.CSSProperties = {
        marginTop: 56,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: Colors.BACKGROUND,
        flexDirection: 'column',
        display: 'flex',
        flex: 1
    };
}

/**
 * This is default wrapper component we use to have all pages containers render the same way
 */
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
