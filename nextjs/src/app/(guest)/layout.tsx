import { GuestGuard } from '@/core/components/auth/GuestGuard';

export default function AuthLayout({
   children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GuestGuard>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full space-y-8">
                    {children}
                </div>
            </div>
        </GuestGuard>
    );
}