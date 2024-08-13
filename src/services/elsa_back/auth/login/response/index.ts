import { GenericStatusResponse } from "@/services/elsa_back/generic/response";

export interface LoginResponse extends GenericStatusResponse {
    refresh: string;
    access: string;
}
