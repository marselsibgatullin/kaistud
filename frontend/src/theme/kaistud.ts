import {CssVarsTheme, experimental_extendTheme as extendTheme, responsiveFontSizes, Theme} from "@mui/material";

const KaiStudTheme = responsiveFontSizes(
    extendTheme({
        cssVarPrefix: "KaiStud",
        typography: {
            fontFamily: "Montserrat, sans-serif",
        },
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        main: '#3561a6',
                    },
                    secondary: {
                        main: '#f0f4f4',
                    },
                    error: {
                        main: '#ef2525',
                    },
                    background: {
                        default: '#eef7ff',
                        paper: 'white',
                    },
                    light: {
                        main: '#fff',
                        contrastText: '#3561a6',
                    }
                },
            },
        },
        shape: {
            borderRadius: 10,
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiButton: {
                defaultProps: {
                    variant: "contained",
                    size: "large",
                },
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        boxShadow: '11px 11.3px 27px 0 rgb(19, 110, 119, 0.14%)',
                    },
                }
            },
            MuiTextField: {
                defaultProps: {
                    fullWidth: true,
                    variant: "outlined",
                }
            },
            MuiTypography: {
                styleOverrides: {
                    h2: {
                        fontSize: 32,
                    }
                }
            },
        },
    })
) as Omit<Theme, "palette"> & CssVarsTheme


export {KaiStudTheme}