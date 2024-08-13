"use client";
import { Box } from "@mui/material";
import PurchaseRequestsGrid from "./components/PurchaseRequestsGrid";
import { useGlobalContext } from "@/app/context";
import { TError } from "@/domain/errors/ErrorFactory";
import { getPurchaseRequest } from "@/services/elsa_back/purchase-request/get/request";
import { PurchaseRequestGetResponse } from "@/services/elsa_back/purchase-request/get/response";
import { useEffect, useState } from "react";

export default function Dashboard(): JSX.Element {
    const [response, setResponse] = useState<PurchaseRequestGetResponse[] | null>(null); // [1
    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const fetchData = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            const res = await getPurchaseRequest();
            setResponse(res);
            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Solicitud de compra cargada correctamente"
            });
        } catch (error) {
            if (error instanceof TError) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: error.message
                });
            }
        } finally {
            setOpenLoading(false);
        }
    };

    useEffect((): void => {
        fetchData();
    }, []);

    return (
        <Box className="mt-10" component="section">
            {response ? (
                <PurchaseRequestsGrid purchaseRequests={response} refetchData={fetchData} />
            ) : (
                <p>No hay solicitudes de compra pendientes.</p>
            )}
        </Box>
    );
}
