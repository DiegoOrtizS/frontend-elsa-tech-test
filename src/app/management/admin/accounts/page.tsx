"use client";
import { Box } from "@mui/material";
import { UserForm } from "./components";

export default function Dashboard(): JSX.Element {
    return (
        <Box className="mt-10" component="section">
            <UserForm />
        </Box>
    );
}
