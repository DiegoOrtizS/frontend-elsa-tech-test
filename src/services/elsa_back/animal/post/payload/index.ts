import { Payload } from "@/services/Payload";

export interface AnimalPayloadPatch extends Payload {
    name?: string;
    age?: number;
    breed?: string
    petType?: string;
    status?: string;    
}

export interface AnimalPayload extends Payload {
    name: string;
    age: number;
    breed: string
    petType: string;
    status: string;
}
