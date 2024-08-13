import { Module } from "@/domain/interface/Module";
import { Box, Paper, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { ModuleIcon } from "./ModuleIcon";
import Link from "next/link";


export const ModuleCard = ({ module }: { module: Module }): JSX.Element => {
    return (
        <Link
            href={module.link}
            style={{
                textDecoration: "none"
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: "90vw",
                        sm: "250px"
                    },
                    maxWidth: {
                        xs: "90vw",
                        sm: "250px"
                    }
                }}
            >
                <Paper elevation={3} className="p-4">
                    <Box className="flex justify-start mb-5">
                        <ModuleIcon module={module} />
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        className="font-bold"
                    >
                        {module.title}
                    </Typography>
                    <Typography variant="body1" component="p" className="mt-5">
                        {module.description}
                    </Typography>
                    <Box className="mt-5 flex justify-end">
                        <ArrowForward />
                    </Box>
                </Paper>
            </Box>
        </Link>
    );
};
