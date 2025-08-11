'use client';

import { ReactNode } from 'react';
import { useAuthCheck } from '@/core/hooks/useAuthCheck';
import { LoadingSpinner } from '@/core/components/ui/LoadingSpinner';

interface GuestGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
    redirectTo?: string;
}

export function GuestGuard({
   children,
   fallback,
   redirectTo = '/dashboard'
}: GuestGuardProps) {
    const { isLoading, isAuthenticated } = useAuthCheck({
        redirectIfAuthenticated: true,
        requireAuth: false
    });

    if (isLoading) {
        return fallback || (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Vérification...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <>{children}</>;
    }

    return fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                    Redirection en cours...
                </h2>
                <p className="mt-2 text-gray-600">
                    Vous êtes déjà connecté, redirection vers le tableau de bord.
                </p>
            </div>
        </div>
    );
}