import { ElsaBackApi } from "../../../ElsaBackApi";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { getCookie } from "@/app/actions";
import { RegisterPayloadPatch } from "@/services/elsa_back/auth/register/payload";

export const updateUser = async (id: string, data: RegisterPayloadPatch): Promise<void> => {
    const api = new ElsaBackApi();
    try {
        const token = await getCookie("token");
        if (token) {
            api.setHeader("Authorization", `Bearer ${token}`);
        }
        const r = await api.patch<RegisterPayloadPatch>(`/user/${id}/`, data);
        console.log(r);
    } catch (error) {
        if (isAxiosError(error)) {
            const { response } = error;
            if (!response) {
                throw ErrorFactory.create(
                    "Error en el servidor, intente nuevamente",
                    "Unknown"
                );
            }
            if (response.status === 403) {
                throw ErrorFactory.create(
                    "Usuario no autorizado",
                    "Forbidden"
                );
            }
        }
        throw ErrorFactory.create(
            "Error en el servidor, intente nuevamente",
            "Unknown"
        );
    }
};
