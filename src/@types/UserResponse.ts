export interface User {
    name?: string;
    email: string;
    verified: boolean;

    key: string;

    createdDate: string;
}
export interface UserResponse {
    ok: boolean;
    user: User;
}