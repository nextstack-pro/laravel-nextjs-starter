'use client';

import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function PublicNavigation() {
  const { user, isLoading } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Mon App
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                À propos
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="/pricing" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Tarifs
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 hidden sm:block">
                  Bonjour, {user.name}
                </span>
                <Link
                  href="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Tableau de bord
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Se connecter
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200 bg-gray-50">
        <div className="px-4 py-2 space-y-1">
          <Link 
            href="/about" 
            className="block py-2 text-gray-600 hover:text-gray-900"
          >
            À propos
          </Link>
          <Link 
            href="/contact" 
            className="block py-2 text-gray-600 hover:text-gray-900"
          >
            Contact
          </Link>
          <Link 
            href="/pricing" 
            className="block py-2 text-gray-600 hover:text-gray-900"
          >
            Tarifs
          </Link>
          
          {!user && !isLoading && (
            <div className="pt-2 border-t border-gray-300 mt-2">
              <Link 
                href="/auth/login" 
                className="block py-2 text-gray-600 hover:text-gray-900"
              >
                Se connecter
              </Link>
              <Link 
                href="/auth/register" 
                className="block py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}