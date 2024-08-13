import { Payload } from "@/services/Payload";

export interface AdoptionPayloadPatch extends Payload {
    animalId?: string;
    volunteerId?: string;
    adopterId?: string; 
}

export interface AdoptionPayload extends Payload {
    animalId: string;
    volunteerId: string;
    adopterId: string;
}
