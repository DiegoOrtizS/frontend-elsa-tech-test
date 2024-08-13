"use client";
import { Box } from "@mui/material";
import CrudTable from "./components/CrudTable";

export default function Dashboard(): JSX.Element {
    return (
        <Box className="mt-10" component="section">
            <CrudTable />
        </Box>
    );
}
