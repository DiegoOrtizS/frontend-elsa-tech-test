"use client";

import { Theme } from "@emotion/react";
import { Paper, SxProps } from "@mui/material";

interface GeneralContainerProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const GeneralContainer = ({
    children,
    sx = {}
}: GeneralContainerProps): JSX.Element => {
    return (
        <Paper
            elevation={3}
            sx={{
                padding: "25px",
                height: "100%",
                overflowY: "hidden",
                ...sx
            }}
        >
            {children}
        </Paper>
    );
};
