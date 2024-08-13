import { createTheme } from "@mui/material/styles";
export const ligthTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280
        }
    },
    palette: {
        mode: "light",
        primary: {
            main: "rgb(84, 72, 146)"
        }
    },
    // set primary color red
    // primary: {

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#f3f4f6"
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    color: "#151d48",
                    borderRadius: "0px"
                }
            }
        },
        MuiTypography: {
            // h4
            styleOverrides: {
                h4: {
                    color: "#151d48"
                },
                h5: {
                    color: "#151d48"
                },
                h6: {
                    color: "#151d48"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "15px"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "15px",
                    padding: "15px 20px"
                }
            }
        }
    }
});
