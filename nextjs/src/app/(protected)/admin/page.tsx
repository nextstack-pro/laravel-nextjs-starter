export const metadata = {
    title: 'Administration',
    description: 'Panel d\'administration',
};

export default function AdminPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
                <p className="text-gray-600">Gestion de l'application</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Contenu admin */}
            </div>
        </div>
    );
}