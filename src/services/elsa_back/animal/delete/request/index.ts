import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { getCookie } from "@/app/actions";
import { ElsaBackApi } from "@/services/elsa_back/ElsaBackApi";

export const animalDelete = async (id: string): Promise<void> => {
    const api = new ElsaBackApi();
    try {
        const token = await getCookie("token");
        if (token) {
            api.setHeader("Authorization", `Bearer ${token}`);
        }
        await api.delete<void>(`/animal/${id}/`);
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
