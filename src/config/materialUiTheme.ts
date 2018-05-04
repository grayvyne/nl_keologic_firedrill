import { red } from 'material-ui/colors';
import blueGrey from 'material-ui/colors/blueGrey';
import lightBlue from 'material-ui/colors/lightBlue';
import { createMuiTheme } from 'material-ui/styles';

const appGreen = '#51C37D';
const appBlue = '#02A9F4';
const appRed = '#FF5252';
const appLightGrey = '#EEEEEE';
const appOrange = '#FFA727';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: lightBlue[300],
            main: lightBlue[500],
            dark: lightBlue[700],
            contrastText: '#fff'
        },
        secondary: {
            light: 'rgba(94,215,141,1)',
            main: appGreen,
            dark: blueGrey[800],
            contrastText: '#fff'
        },
        error: {
            main: red[400]
        }
    },
    typography: {
        title: {
            fontWeight: 500
        },
        subheading: {
            fontWeight: 'normal'
        },
        body1: {
            fontSize: 16,
            fontWeight: 'normal',
            color: 'rgba(0,0,0,0.87)'
        }
    }
});

export const Colors = {
    DISABLED_TAB_ICON: 'rgba(0, 0, 0, 0.26)',
    CLAIMED_CLASS_BUTTON: appOrange,
    UNCLAIMED_CLASS_BUTTON: appGreen,
    CLASS_BUTTON_TEXT: 'white',
    MISSING_BUTTON: appRed,
    ABSENT_BUTTON: appBlue,
    FOUND_BUTTON: appGreen,
    POPOVER_DOCK_BG: appLightGrey,
    SUBMIT_CLASS_BUTTON: appGreen,
    SELECTED_TAB_TINT: '#37474F',
    FIND_A_CLASS: appGreen,
    CLAIM_CLASS_BUTTON: appGreen,
    SUBTEXT_GREY: 'rgba(0,0,0,0.54)',
    ICON_GREY: '#757575',
    SEARCH_CANCEL_BUTTON: '#9E9E9E',
    TABLE_CELL_GREY: '#EEEEEE',
    BACKGROUND: 'white',
    LIGHT_GREY: 'rgba(0,0,0,0.34)'
};
