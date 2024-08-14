import { ThemeProvider, CssBaseline, Snackbar, Alert } from "@mui/material";
import { useEffect } from "react";
import { Loader } from "../Loader";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/app/context";
import { userMe } from "@/services/elsa_back/user/get";

export const ElsaTheme = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const {
        theme,
        openAlert,
        setOpenAlert,
        alertMessage,
        setUser,
        openLoading
    } = useGlobalContext();
    const path = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect((): void => {
        if (path.includes("/auth/")) return;
        setLoading(true);
        userMe()
            .then((resp) => {
                setUser({
                    role: resp.role,
                    firstName: resp.user.firstName,
                    lastName: resp.user.lastName,
                    email: resp.user.email,
                    id: resp.user.id
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={(): void => {
                    setOpenAlert(false);
                }}
                anchorOrigin={{
                    vertical: alertMessage.vertical,
                    horizontal: alertMessage.horizontal
                }}
            >
                <Alert
                    onClose={(): void => {
                        setOpenAlert(false);
                    }}
                    severity={alertMessage.severity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage.message}
                </Alert>
            </Snackbar>
            <Loader open={openLoading || loading} />
            <body>{children}</body>
        </ThemeProvider>
    );
};
