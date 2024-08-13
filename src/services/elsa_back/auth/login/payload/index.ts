import { Payload } from "@/services/Payload";

export interface LoginPayload extends Payload {
  email: string;
  password: string;
}
