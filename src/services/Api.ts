import axios, { AxiosInstance } from "axios";
import { Payload } from "./Payload";

export class Api {
    protected instance: AxiosInstance;
    constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    public setHeader(name: string, value: string): void {
        this.instance.defaults.headers.common[name] = value;
    }

    public getHeader(name: string): string {
        return this.instance.defaults.headers.common[name]?.toString() || "";
    }

    public hasHeader(name: string): boolean {
        return this.instance.defaults.headers.common[name] !== undefined;
    }

    public async get<T>(url: string, payload?: Payload): Promise<T> {
        const response = await this.instance.get<T>(url, { params: payload });
        return response.data;
    }

    public async post<T>(url: string, data: Payload): Promise<T> {
        const response = await this.instance.post<T>(url, data);
        return response.data;
    }

    public async put<T>(url: string, data?: Payload): Promise<T> {
        const response = await this.instance.put<T>(url, data);
        return response.data;
    }

    public async delete<T>(url: string): Promise<T> {
        const response = await this.instance.delete<T>(url);
        return response.data;
    }

    public async patch<T>(url: string, data?: Payload): Promise<T> {
        const response = await this.instance.patch<T>(url, data);
        return response.data;
    }
}
