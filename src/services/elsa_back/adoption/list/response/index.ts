import { GenericStatusResponse } from "@/services/elsa_back/generic/response";

export interface ListResponse<T> extends GenericStatusResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
