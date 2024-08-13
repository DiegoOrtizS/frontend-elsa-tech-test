import { User } from "@/domain/models";
import { GenericStatusResponse } from "@/services/elsa_back/generic/response";

export interface UserMeResponse extends GenericStatusResponse {
    role: string;
    user: User;
}
