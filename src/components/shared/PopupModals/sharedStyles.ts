import { CSSProperties } from 'react';
import { ViewStyle, TextStyle, Dimensions } from 'react-native';
import { Colors } from '../../../config/materialUiTheme';

export namespace styles {
    export const hideBoxShadow = {
        boxShadow: 'none'
    };

    export const iconButton: CSSProperties = {
        alignSelf: 'center',
        marginLeft: -10
    };

    export const tableViewContainer = {
        paddingBottom: 150
    };

    export const dockedBottomButton: ViewStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 80,
        backgroundColor: Colors.POPOVER_DOCK_BG,
        justifyContent: 'center',
        alignItems: 'center'
    };

    export const containerBackground = {
        backgroundColor: 'white'
    };

    export const stretchItems = {
        alignItems: 'stretch'
    };

    export const submitClassButton: ViewStyle = {
        height: 50,
        width: '75%',
        backgroundColor: Colors.SUBMIT_CLASS_BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    };

    export const submitClassText: TextStyle = {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    };

    export const modalHeader: CSSProperties = {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        paddingTop: 20
    };

    export const radioButton = {
        marginLeft: 20,
        marginRight: 20
    };

    export const divider = {
        marginTop: 20
    };

    export const buttonTextColor = 'white';

    export const centerContent = {
        justifyContent: 'center',
        alignItems: 'center'
    };

    export const dialogContainer = {
        width: Dimensions.get('window').width - 50,
        backgroundColor: 'white'
    };

    export const marginRight = {
        marginRight: 15
    };
}
