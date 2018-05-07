import * as React from 'react';

interface Props {
    height?: number | string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

namespace style {
    export const cellContainerStyle: React.CSSProperties = {
        width: '100%',
        padding: 0
    };
    export const highlightWrapper: React.CSSProperties = {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center'
    };
}

export default class TableCell extends React.Component<Props> {
    public render(): JSX.Element {
        let wrapperProps: {} = { style: { ...style.highlightWrapper, ...this.props.style } };
        if (null != this.props.onClick) {
            wrapperProps = { ...wrapperProps, onPress: this.props.onClick };
        }

        return (
            <div style={{ ...style.cellContainerStyle, ...{ height: this.props.height } }}>
                <div {...wrapperProps}>{this.props.children}</div>
            </div>
        );
    }
}
