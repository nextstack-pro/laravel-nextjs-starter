'use client';
import { RegisterForm } from '../components/RegisterForm';
import Link from 'next/link';

export function RegisterPage() {

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>

            <RegisterForm />

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Vous avez déjà un compte?{' '}
                    <Link href="/auth/login" className="text-blue-600 hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}