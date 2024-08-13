import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { ElsaBackApi } from "@/services/elsa_back/ElsaBackApi";
import { AdoptionPayload } from "../payload";

export const createAdoption = async (payload: AdoptionPayload): Promise<void> => {
    const api = new ElsaBackApi();
    try {
        await api.post<void>(
            "/adoption/",
            payload
        );
    } catch (error) {
        if (isAxiosError(error)) {
            const { response } = error;
            if (!response) {
                throw ErrorFactory.create(
                    "Error en el servidor, intente nuevamente",
                    "Unknown"
                );
            }
            if (response.status === 400) {
                throw ErrorFactory.create(JSON.stringify(response.data), "BadRequest");
            }
            if (response.status === 401) {
                throw ErrorFactory.create(
                    "Usuario o contraseña incorrectos",
                    "InvalidCredentials"
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
