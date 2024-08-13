"use client";
import { Box } from "@mui/material";
import SupplierForm from "./components/SupplierForm";
import { useGlobalContext } from "@/app/context";
import { createSupplier } from "@/services/elsa_back/supplier/request";
import { TError } from "@/domain/errors/ErrorFactory";
import { SupplierDataPayload } from "@/services/elsa_back/supplier/payload";

export default function Dashboard(): JSX.Element {
    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const validateSupplierData = (data: SupplierDataPayload): string | null => {
        if (!data.name || !data.last_name || data.addresses.length === 0 || data.contacts.length === 0) {
            return "Complete los campos obligatorios";
        }
    
        for (const address of data.addresses) {
            if (!address.address_line || !address.district || !address.province || 
                !address.department || !address.country || !address.postal_code) {
                return "Complete los campos obligatorios de dirección";
            }
        }
    
        for (const contact of data.contacts) {
            if (!contact.contact_type || !contact.contact_info) {
                return "Complete los campos obligatorios de contacto";
            }
        }
    
        return null;
    };

    const submitForm = async (data: SupplierDataPayload): Promise<void> => {
        try {
            const validationError = validateSupplierData(data);
            if (validationError) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: validationError
                });
                return;
            }
            setOpenLoading(true);
            await createSupplier(data);
            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Proveedor creado correctamente"
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
            <SupplierForm onSubmit={submitForm} />
        </Box>
    );
}
