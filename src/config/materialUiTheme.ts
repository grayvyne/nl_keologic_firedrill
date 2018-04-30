import blueGrey from 'material-ui/colors/blueGrey';
import lightBlue from 'material-ui/colors/lightBlue';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';
import { createMuiTheme } from 'material-ui/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: lightBlue[300],
            main: lightBlue[500],
            dark: lightBlue[700],
            contrastText: '#fff'
        },
        secondary: {
            light: blueGrey[800],
            main: red[400],
            dark: blueGrey[800],
            contrastText: '#fff'
        },
        error: orange
    }
});

const appGreen = '#71BF83';
const appBlue = '#49A8EE';
const appRed = '#EC5F59';
const appLightGrey = '#EEEEEE';

export const Colors = {
    DISABLED_TAB_ICON: 'rgba(0, 0, 0, 0.26)',
    CLAIMED_CLASS_BUTTON: appGreen,
    UNCLAIMED_CLASS_BUTTON: appBlue,
    CLASS_BUTTON_TEXT: 'white',
    MISSING_BUTTON: appRed,
    ABSENT_BUTTON: appBlue,
    FOUND_BUTTON: appGreen,
    POPOVER_DOCK_BG: appLightGrey,
    SUBMIT_CLASS_BUTTON: appGreen,
    SELECTED_TAB_TINT: '#37474F',
    FIND_A_CLASS: appGreen,
    CLAIM_CLASS_BUTTON: appGreen
};
