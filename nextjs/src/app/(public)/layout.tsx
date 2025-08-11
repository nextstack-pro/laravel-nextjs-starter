import { PublicNavigation } from '@/core/components/navigation/PublicNavigation';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <PublicNavigation />

            <main>
                {children}
            </main>
        </div>
    );
}