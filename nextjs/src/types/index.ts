export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    register: (data: RegisterData) => Promise<boolean>;
    logout: () => Promise<void>;
}