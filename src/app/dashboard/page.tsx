"use client";
import { useGlobalContext } from "../context";
import { useLayoutEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { Module } from "@/domain/interface/Module";
import { DataObject, Settings } from "@mui/icons-material";

import { UserBanner, ModuleCard } from "./components";

export default function Dashboard(): JSX.Element {
    const { user, setSectionTitle } = useGlobalContext();
    const modules = useMemo<Module[]>(() => {
        const m = [
            {
                title: "Administración",
                description: "Administra los usuarios",
                icon: <Settings htmlColor="#0369A1" />,
                backgroundColor: "#BAE6FD",
                link: "/management/admin/crud",
                role: "admin"
            },
            {
                title: "Administración",
                description: "Administra los animales",
                icon: <Settings htmlColor="#0369A1" />,
                backgroundColor: "#BAE6FD",
                link: "/management/admin/crud-animals",
                role: "admin"
            },
            {
                title: "Administración",
                description: "Administra las adopciones",
                icon: <Settings htmlColor="#0369A1" />,
                backgroundColor: "#BAE6FD",
                link: "/management/admin/crud-adoptions",
                role: "admin"
            },
            {
                title: "Creación de proveedores",
                description: "Lorem ipsum",
                icon: <DataObject htmlColor="#62569A" />,
                backgroundColor: "#DDD6FE",
                link: "/management/supplier/register",
                role: "requester",
            },
            {
                title: "Registro de solicitudes de compra",
                description: "Lorem ipsum",
                icon: <DataObject htmlColor="#62569A" />,
                backgroundColor: "#DDD6FE",
                link: "/management/purchase-request/register",
                role: "requester"
            },
            {
                title: "Ver solicitudes de compra pendientes",
                description: "Lorem ipsum",
                icon: <DataObject htmlColor="#62569A" />,
                backgroundColor: "#DDD6FE",
                link: "/management/purchase-request/pending",
                role: "approver"
            }
        ];
        return m.filter((module) => module.role === user?.role || module.role === "all");
    }, [user]);

    useLayoutEffect((): void => {
        setSectionTitle("logo");
    }, []);

    return (
        <>
            <Box className="mt-10" component="section">
                <UserBanner name={user?.firstName ?? ""} />
            </Box>
            <Box
                className="mt-10 flex gap-6 flex-wrap"
                component="section"
                sx={{
                    justifyContent: {
                        xs: "center",
                        sm: "start"
                    }
                }}
            >
                {modules.map((module: Module, index: number) => (
                    <ModuleCard key={index} module={module} />
                ))}
            </Box>
        </>
    );
}
