"use client";
import "./index.css";
import { Modal } from "@mui/material";

interface LoaderProps {
    open: boolean;
}

export const Loader = ({ open }: LoaderProps): JSX.Element => {
    return (
        <Modal
            component={"div"}
            open={open}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <span className="loader"></span>
        </Modal>
    );
};
