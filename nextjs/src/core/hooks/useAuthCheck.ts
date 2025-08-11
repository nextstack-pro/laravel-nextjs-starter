'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface UseAuthCheckOptions {
    redirectTo?: string;
    redirectIfAuthenticated?: boolean;
    requireAuth?: boolean;
}

export function useAuthCheck({
    redirectTo = '/auth/login',
    redirectIfAuthenticated = false,
    requireAuth = true,
}: UseAuthCheckOptions = {}) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (isLoading) return;

        const isAuthenticated = !!user;

        if (requireAuth && !isAuthenticated) {
            const currentPath = window.location.pathname;
            const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
            router.push(redirectUrl);
            return;
        }

        if (redirectIfAuthenticated && isAuthenticated) {
            router.push('/dashboard');
            return;
        }

        setIsChecking(false);
    }, [user, isLoading, router, redirectTo, redirectIfAuthenticated, requireAuth]);

    return {
        isAuthenticated: !!user,
        isLoading: isLoading || isChecking,
        user,
    };
}