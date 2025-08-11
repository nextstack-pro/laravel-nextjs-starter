'use client';
import { LoginForm } from '../components/LoginForm';
import Link from 'next/link';

export function LoginPage() {

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

            <LoginForm />

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Vous n'avez pas de compte?{' '}
                    <Link href="/auth/register" className="text-blue-600 hover:underline">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
}