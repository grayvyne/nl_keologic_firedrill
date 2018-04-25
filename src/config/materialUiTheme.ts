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

export const Colors = {
    DISABLED_TAB_ICON: 'rgba(0, 0, 0, 0.26)',
    CLAIMED_CLASS_BUTTON: 'green',
    UNCLAIMED_CLASS_BUTTON: 'blue',
    CLASS_BUTTON_TEXT: 'white',
    MISSING_BUTTON: '#EC5F59',
    ABSENT_BUTTON: '#49A8EE',
    FOUND_BUTTON: '#71BF83',
};
