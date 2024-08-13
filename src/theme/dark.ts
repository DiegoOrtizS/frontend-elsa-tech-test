import { createTheme } from "@mui/material/styles";
export const darkTheme = createTheme({
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
        mode: "dark",
        primary: {
            main: "rgb(84, 72, 146)"
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: "0px"
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
