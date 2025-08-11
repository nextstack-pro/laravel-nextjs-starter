import apiClient from '@/core/services/apiClient';
import type { LoginCredentials, RegisterData, User } from '@/types';

export const authService = {
    async login(credentials: LoginCredentials): Promise<User> {
        await apiClient.post('/api/login', credentials);
        const response = await apiClient.get<User>('/api/user');
        return response.data;
    },

    async register(data: RegisterData): Promise<User> {
        await apiClient.post('/api/register', data);
        const response = await apiClient.get<User>('/api/user');
        return response.data;
    },

    async logout(): Promise<void> {
        await apiClient.post('/api/logout');
    },

    async getUser(): Promise<User | null> {
        try {
            const response = await apiClient.get<User>('/api/user');
            return response.data;
        } catch (error) {
            return null;
        }
    }
};