'use client';

import { ReactNode } from 'react';
import { useAuthCheck } from '@/core/hooks/useAuthCheck';
import { LoadingSpinner } from '@/core/components/ui/LoadingSpinner';

interface AuthGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
    redirectTo?: string;
}

export function AuthGuard({
    children,
    fallback,
    redirectTo = '/auth/login'
}: AuthGuardProps) {
    const { isLoading, isAuthenticated } = useAuthCheck({
        redirectTo,
        requireAuth: true
    });

    if (isLoading) {
        return fallback || (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return fallback || (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                    Redirection en cours...
                </h2>
                <p className="mt-2 text-gray-600">
                    Vous allez être redirigé vers la page de connexion.
                </p>
            </div>
        </div>
    );
}