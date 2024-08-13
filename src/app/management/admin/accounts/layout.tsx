"use client";
import { Navbar } from "@/app/components";
import { useGlobalContext } from "@/app/context";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";


export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    const { user, openAlertMessage } = useGlobalContext();
    const [ authorized, setAuthorized ] = useState<boolean>(false);
    const router = useRouter();

    useLayoutEffect((): void => {
        if (user?.role) {
            if (user.role === "admin")
                setAuthorized(true);
            else {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: "No tienes permisos para acceder a esta página"
                });
                router.push("/");
            }
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <Container
                component="main"
                sx={{
                    maxWidth: {
                        lg: "70%"
                    }
                }}
            >
                {authorized ? children : null}
            </Container>
        </>
    );
}
