export interface GenericStatusResponse {
    status: number;
}

export interface GenericResponse extends GenericStatusResponse {
    body: {
        message: string;
    };
}
