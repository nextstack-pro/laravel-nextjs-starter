import { AuthGuard } from '@/core/components/auth/AuthGuard';
import { ProtectedNavigation } from '@/core/components/navigation/ProtectedNavigation';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-50">
                <ProtectedNavigation />

                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}