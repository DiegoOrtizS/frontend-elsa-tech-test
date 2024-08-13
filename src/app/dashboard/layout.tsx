"use client";
import { Navbar } from "../components";
import { Container } from "@mui/material";


export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <>
            <Navbar />
            <Container
                component="main"
                sx={{
                    maxWidth: {
                        lg: "100%"
                    }
                }}
            >
                {children}
            </Container>
        </>
    );
}
