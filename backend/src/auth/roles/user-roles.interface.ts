export type UserRole = 'admin' | 'employee';

export interface ActiveUser {
    userId: string;
    email: string;
    role: UserRole;
}