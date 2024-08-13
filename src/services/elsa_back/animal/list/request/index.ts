import { ListResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { getCookie } from "@/app/actions";
import { AnimalPayload } from "@/services/elsa_back/animal/post/payload";
import { ElsaBackApi } from "@/services/elsa_back/ElsaBackApi";
import { TableData } from "@/app/components/Table";

export type AnimalListResponse = ListResponse<AnimalPayload> & { id: string };


export const animalList = async (page: number): Promise<TableData<AnimalListResponse>> => {
    const api = new ElsaBackApi();
    try {
        const token = await getCookie("token");
        if (token) {
            api.setHeader("Authorization", `Bearer ${token}`);
        }
        const response: TableData<AnimalListResponse> = await api.get<TableData<AnimalListResponse>>("/animals/?page=" + page);
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
