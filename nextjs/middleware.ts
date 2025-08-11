import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    const isAuthRoute = pathname.startsWith('/auth/');

    if (isAuthRoute) {
        const isAuthenticated = await checkAuthStatus(request);

        if (isAuthenticated) {
            const dashboardUrl = new URL('/dashboard', request.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    return NextResponse.next();
}

/**
 * Vérifie le statut d'authentification via les cookies Sanctum
 */
async function checkAuthStatus(request: NextRequest): Promise<boolean> {
    try {
        const sessionCookie = request.cookies.get('laravel_session');
        const xsrfToken = request.cookies.get('XSRF-TOKEN');

        if (!sessionCookie || !xsrfToken) {
            return false;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
            console.warn('NEXT_PUBLIC_API_URL non définie');
            return false;
        }

        const response = await fetch(`${apiUrl}/api/user`, {
            headers: {
                'Cookie': request.headers.get('cookie') || '',
                'Accept': 'application/json',
                'Referer': request.url,
            },
            credentials: 'include',
        });

        return response.ok;
    } catch (error) {
        console.error('Erreur lors de la vérification auth:', error);
        return false;
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}