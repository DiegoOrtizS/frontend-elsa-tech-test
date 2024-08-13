"use client";
import "./globals.css";
import { GlobalContextProvider } from "./context";
import { ElsaTheme } from "./components";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="es">
            <head>
                <title>Albergue</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <GlobalContextProvider>
                <ElsaTheme>{children}</ElsaTheme>
            </GlobalContextProvider>
        </html>
    );
}
