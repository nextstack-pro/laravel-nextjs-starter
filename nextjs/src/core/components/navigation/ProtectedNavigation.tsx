'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function ProtectedNavigation() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Mon App
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Tableau de bord
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Profil
              </Link>
              <Link 
                href="/settings" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Paramètres
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 hidden sm:block">
              Bonjour, {user?.name || 'Utilisateur'}
            </span>
            
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mon Profil
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Paramètres
                </Link>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200 bg-gray-50">
        <div className="px-4 py-2 space-y-1">
          <Link 
            href="/dashboard" 
            className="block py-2 text-gray-600 hover:text-gray-900"
          >
            Tableau de bord
          </Link>
          <Link 
            href="/profile" 
            className="block py-2 text-gray-600 hover:text-gray-900"
          >
            Profil
          </Link>
          <Link 
            href="/settings" 
            className="block py-2 text-gray-600 hover:text-gray-900"
          >
            Paramètres
          </Link>
        </div>
      </div>
    </nav>
  );
}