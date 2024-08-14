import { ListResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { getCookie } from "@/app/actions";
import { RegisterPayload } from "@/services/elsa_back/auth/register/payload";
import { ElsaBackApi } from "@/services/elsa_back/ElsaBackApi";
import { TableData } from "@/app/components/Table";

export interface UserListResponse extends ListResponse<RegisterPayload> { id: string }


export const userList = async (page: number): Promise<TableData<UserListResponse>> => {
    const api = new ElsaBackApi();
    try {
        const token = await getCookie("token");
        if (token) {
            api.setHeader("Authorization", `Bearer ${token}`);
        }
        const response: TableData<UserListResponse> = await api.get<TableData<UserListResponse>>("/users/?page=" + page);
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
