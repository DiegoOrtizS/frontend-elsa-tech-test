import { LoginPayload } from "../payload";
import { LoginResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { ElsaBackApi } from "@/services/elsa_back/ElsaBackApi";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const api = new ElsaBackApi();
    try {
        const response: LoginResponse = await api.post<LoginResponse>(
            "/auth/login",
            payload
        );
        api.setHeader(
            "Authorization",
            `Bearer ${response.access}`
        );
        return response;
    } catch (error) {
        if (isAxiosError(error)) {
            const { response } = error;
            if (!response) {
                throw ErrorFactory.create(
                    "Error en el servidor, intente nuevamente",
                    "Unknown"
                );
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
