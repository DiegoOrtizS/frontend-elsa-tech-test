import { Api } from "../Api";

let singleton: ElsaBackApi | null = null;

export class ElsaBackApi extends Api {
    constructor() {
        if (!singleton) {
            super(process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "");
            singleton = this;
        }
        return singleton;
    }
}

export const setToken = (token: string): void => {
    const api = new ElsaBackApi();
    api.setHeader("Authorization", `Bearer ${token}`);
};
