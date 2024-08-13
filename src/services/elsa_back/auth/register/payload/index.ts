import { Payload } from "@/services/Payload";

export interface RegisterPayloadPatch extends Payload {
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  role?: string;
  isActive?: boolean;
}

export interface RegisterPayload extends Payload {
  user: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  };
  role: string;
}
