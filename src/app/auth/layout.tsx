"use client";
import { Box, Container, Paper } from "@mui/material";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <Container
            component="main"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}
        >
            <Box
                sx={{
                    width: "70%",
                    minWidth: "320px",
                    maxWidth: "500px"
                }}
            >
                <Paper elevation={3}>
                    {children}
                </Paper>
            </Box>
        </Container>
    );
}
