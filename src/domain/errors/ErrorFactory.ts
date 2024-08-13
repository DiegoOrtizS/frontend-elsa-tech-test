export class TError extends Error {
    message: string;
    type: string;
    constructor(message: string, type: string) {
        super(message);
        this.message = message;
        this.type = type;
    }
}

export class ErrorFactory {
    static create(message: string, type: string): Error {
        return new TError(message, type);
    }
}
