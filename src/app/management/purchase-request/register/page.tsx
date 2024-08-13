"use client";
import { Box } from "@mui/material";
import OrderForm from "./components/OrderForm";
import { useGlobalContext } from "@/app/context";
import { createPurchaseRequest } from "@/services/elsa_back/purchase-request/create/request";
import { TError } from "@/domain/errors/ErrorFactory";
import { PurchaseRequestCreatePayload } from "@/services/elsa_back/purchase-request/create/payload";

export default function Dashboard(): JSX.Element {
    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const submitForm = async (data: PurchaseRequestCreatePayload): Promise<void> => {
        try {
            if (data.products.length === 0) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: "Debe agregar al menos un producto"
                });
                return;
            }
            setOpenLoading(true);
            await createPurchaseRequest(data);
            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Solicitud de compra creada correctamente"
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

    return (
        <Box className="mt-10" component="section">
            <OrderForm onSubmit={submitForm} />
        </Box>
    );
}
