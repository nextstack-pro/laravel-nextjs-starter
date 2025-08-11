'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import type { AuthContextType, LoginCredentials, RegisterData, User } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await authService.getUser();
                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        setIsLoading(true);
        try {
            const userData = await authService.login(credentials);
            setUser(userData);
            toast.success('Connexion réussie');
            return true;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Échec de la connexion');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterData): Promise<boolean> => {
        setIsLoading(true);
        try {
            const userData = await authService.register(data);
            setUser(userData);
            toast.success('Inscription réussie');
            return true;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Échec de l\'inscription');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await authService.logout();
            setUser(null);
            router.push('/auth/login');
            toast.success('Déconnexion réussie');
        } catch (error) {
            toast.error('Erreur lors de la déconnexion');
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
}