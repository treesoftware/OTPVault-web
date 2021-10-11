export interface Otp {
    id: string;
    name: string;

    key: string;
    digits?: string;
    issuer?: string;
    period?: string;
    algorithm?: string;
    
    user_id: number;
    createdAt: string;
    updatedAt: string;
}