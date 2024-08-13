"use client";
import { useState } from "react";
import { MenuOption } from "@/domain/interface/MenuOption";
import { Theme } from "@mui/material";
import { GlobalContext, IGlobalContext } from "./GlobalContext";
import { AlertMessage } from "@/domain/interface/AlertMessage";
import { darkTheme, ligthTheme } from "@/theme";
import { UserWithRole } from "@/domain/models";

export const GlobalContextProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [sectionTitle, setSectionTitle] = useState<string>("");
    const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
    const [user, setUser] = useState<UserWithRole | undefined>({
        lastName: "",
        firstName: "",
        email: "",
        role: ""
    } as UserWithRole);
    const [theme, setTheme] = useState<Theme>(darkTheme);

    const [openLoading, setOpenLoading] = useState<boolean>(false);

    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<AlertMessage>({
        horizontal: "left",
        vertical: "top",
        severity: "info",
        message: ""
    } as AlertMessage);

    const openAlertMessage = (alert: AlertMessage): void => {
        setAlertMessage(alert);
        setOpenAlert(true);
    };

    const setUsr = (user?: UserWithRole): void => {
        setUser(user);
    };

    const toggleTheme = (): void => {
        if (theme === darkTheme) {
            setTheme(ligthTheme);
        } else {
            setTheme(darkTheme);
        }
    };

    const value: IGlobalContext = {
        user: user,
        setUser: setUsr,
        theme: theme,
        menuOptions: menuOptions,
        setMenuOptions: setMenuOptions,
        toggleTheme: toggleTheme,
        sectionTitle: sectionTitle,
        setSectionTitle: setSectionTitle,
        openAlertMessage: openAlertMessage,
        openAlert: openAlert,
        setOpenAlert: setOpenAlert,
        alertMessage: alertMessage,
        openLoading: openLoading,
        setOpenLoading: setOpenLoading,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
