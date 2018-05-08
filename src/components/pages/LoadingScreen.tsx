import { CircularProgress } from 'material-ui/Progress';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Animated, Dimensions } from 'react-native';
import { Stores } from '../../stores';

interface Props {
    shouldShowLoadingScreen: boolean;
}

interface State {
    opacity: Animated.Value;
    isVisible: boolean;
}

namespace styles {
    export const animatedViewContainer = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: '#FFFFFF66',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    };
    export const loadingScreenBg: React.CSSProperties = {
        height: Dimensions.get('window').height - 110,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    };
}
@observer
class LoadingScreen extends React.Component<Props, State> {
    public state: State = {
        opacity: new Animated.Value(this.props.shouldShowLoadingScreen ? 1.0 : 0.0),
        isVisible: this.props.shouldShowLoadingScreen
    };

    public componentWillReceiveProps(props: Props) {
        const current = this.props.shouldShowLoadingScreen;
        const next = props.shouldShowLoadingScreen;

        if (false === current && next) {
            this.state.opacity.setValue(1.0);
            this.setState({ isVisible: true });
        }

        if (false === next && current) {
            this.fadeOutLoadingScreen();
        }
    }

    public render(): JSX.Element | null {
        if (false === this.state.isVisible) {
            return null;
        }

        return (
            <Animated.View style={[styles.animatedViewContainer, { opacity: this.state.opacity }]}>
                <div style={styles.loadingScreenBg}>
                    <CircularProgress size={100} thickness={5} />
                </div>
            </Animated.View>
        );
    }

    private fadeOutLoadingScreen(): void {
        this.state.opacity.setValue(1.0);

        Animated.timing(this.state.opacity, {
            toValue: 0.0,
            duration: 500
        }).start(() => {
            this.setState({ isVisible: false });
        });
    }
}

function mapStoreToProps(stores: Stores): Props {
    return {
        shouldShowLoadingScreen: stores.firedrillStore.shouldShowLoadingScreen
    };
}

export default inject(mapStoreToProps)(LoadingScreen);
