import { ListResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { getCookie } from "@/app/actions";
import { AdoptionPayload } from "@/services/elsa_back/adoption/post/payload";
import { ElsaBackApi } from "@/services/elsa_back/ElsaBackApi";
import { TableData } from "@/app/components/Table";

export type AdoptionListResponse = ListResponse<AdoptionPayload> & { id: string };


export const adoptionList = async (page: number): Promise<TableData<AdoptionListResponse>> => {
    const api = new ElsaBackApi();
    try {
        const token = await getCookie("token");
        if (token) {
            api.setHeader("Authorization", `Bearer ${token}`);
        }
        const response: TableData<AdoptionListResponse> = await api.get<TableData<AdoptionListResponse>>("/adoptions/?page=" + page);
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
