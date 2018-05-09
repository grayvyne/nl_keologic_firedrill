import * as React from 'react';
import { Colors } from '../../config/materialUiTheme';
import { CSSProperties } from 'react';
import { FiredrillIndicatorStrings as ui } from '../../config/uiConstants';
import { Stores } from '../../stores';
import { inject } from 'mobx-react';

const FIRE_ICON = require('../../imageAssets/fireIcon.png');

namespace styles {
    export const iconStyle: CSSProperties = {
        height: 80,
        width: 80,
        objectFit: 'contain',
        filter: 'grayscale(100%)',
        opacity: 0.7,
        marginTop: 40
    };

    export const container: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white'
    };

    export const text: CSSProperties = {
        color: Colors.LIGHT_GREY,
        marginTop: 20
    };
}

interface Props {
    isFiredrillInProgress: boolean;
}

/**
 * This is a component that is rendered infront of other content to hide it when there is no firedrill active
 * It takes up the full screen and displays a message and icon
 */
class NoFiredrillIndicator extends React.Component<Props> {
    public render(): React.ReactNode {
        if (this.props.isFiredrillInProgress) {
            return this.props.children;
        }

        return (
            <div style={styles.container}>
                <img src={FIRE_ICON} style={styles.iconStyle} />
                <p style={styles.text}>{ui.NO_FIREDRILL_INDICATOR}</p>
            </div>
        );
    }
}

function mapStoresToProps({ firedrillStore }: Stores): Props {
    return {
        isFiredrillInProgress: firedrillStore.isFiredrillInProgress
    };
}

export default inject(mapStoresToProps)(NoFiredrillIndicator);
