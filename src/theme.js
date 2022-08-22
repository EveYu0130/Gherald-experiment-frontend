import {createTheme, responsiveFontSizes} from "@mui/material/styles";

let theme = createTheme({
    palette: {
        primary: {
            main: '#795548',
        },
        secondary: {
            main: '#f5f5f5',
        },
        // warning: {
        //     light: '#ffcc80',
        // }
    },
    typography: {
        // fontFamily: 'Verdana',
        // fontFamily: 'Helvetica',
        // fontFamily: 'Tahoma',
        // fontFamily: 'Trebuchet MS',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});
theme = responsiveFontSizes(theme);

export default theme;
