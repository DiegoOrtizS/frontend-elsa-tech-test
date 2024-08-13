import { Module } from "@/domain/interface/Module";
import { Box } from "@mui/material";


export const ModuleIcon = ({ module }: { module: Module }): JSX.Element => {
    return (
        <Box
            component="div"
            className="rounded-full w-10 h-10 flex items-center justify-center"
            style={{
                backgroundColor: module.backgroundColor
            }}
        >
            {module.icon}
        </Box>
    );
};
