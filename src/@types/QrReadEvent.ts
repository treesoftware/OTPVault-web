export interface QrReadEvent {
    label: string;
    key: string;
    issuer?: string;
    digits?: number;
    algorithm?: string;
}