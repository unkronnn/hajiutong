'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  fallback?: string;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  fallback = '/login',
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated, redirect to login
        router.push(fallback);
      } else if (requireAdmin && user.role !== 'ADMIN') {
        // Authenticated but not admin, redirect to store
        router.push('/store');
      }
    }
  }, [user, loading, requireAdmin, fallback, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or not authorized
  if (!user || (requireAdmin && user.role !== 'ADMIN')) {
    return null;
  }

  return <>{children}</>;
}
