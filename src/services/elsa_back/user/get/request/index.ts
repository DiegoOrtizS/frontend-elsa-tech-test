import { ElsaBackApi } from "../../../ElsaBackApi";
import { UserMeResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { getCookie } from "@/app/actions";

export const userMe = async (): Promise<UserMeResponse> => {
    const api = new ElsaBackApi();
    try {
        const token = await getCookie("token");
        if (token) {
            api.setHeader("Authorization", `Bearer ${token}`);
        }
        const response: UserMeResponse = await api.get<UserMeResponse>("/user/me/");
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
