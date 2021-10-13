import { OtpField } from "./OtpField";

export interface Otp {
    id: string;
    name: string;

    key: string;
    digits?: string;
    issuer?: string;
    period?: string;
    algorithm?: string;

    fields?: OtpField[];
    
    user_id: number;
    createdAt: string;
    updatedAt: string;
}