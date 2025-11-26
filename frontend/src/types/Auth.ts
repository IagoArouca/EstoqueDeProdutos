export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    role: 'ADMIN' | 'employee';
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}