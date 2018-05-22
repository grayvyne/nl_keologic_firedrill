import { Button } from 'material-ui';
import { inject } from 'mobx-react';
import * as React from 'react';
import { CSSProperties } from 'react';
import { Colors } from '../../config/materialUiTheme';
import { FiredrillIndicatorStrings as ui, ManageFiredrillStrings } from '../../config/uiConstants';
import { Stores } from '../../stores';

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

    export const manageButton: React.CSSProperties = { marginTop: 20 };
}

interface Props {
    isFiredrillInProgress: boolean;
    shouldShowManage: boolean;
    initiateFiredrill(): void;
}

/**
 * This is a component that is rendered in front of other content to hide it when there is no firedrill active
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
                {this.props.shouldShowManage && (
                    <Button
                        style={styles.manageButton}
                        variant="raised"
                        color="secondary"
                        onClick={this.props.initiateFiredrill}
                        disabled={this.props.isFiredrillInProgress}
                    >
                        {ManageFiredrillStrings.START_FIREDRILL}
                    </Button>
                )}
            </div>
        );
    }
}

function mapStoresToProps({ firedrillStore }: Stores): Props {
    return {
        isFiredrillInProgress: firedrillStore.isFiredrillInProgress,
        shouldShowManage: firedrillStore.shouldShowManage,
        initiateFiredrill: () => firedrillStore.initiateFiredrill()
    };
}

export default inject(mapStoresToProps)(NoFiredrillIndicator);
