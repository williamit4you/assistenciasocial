import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            const isOnDashboard = pathname.startsWith('/dashboard');
            const isOnLogin = pathname.startsWith('/login');
            const isOnRoot = pathname === '/';

            // Always allow NextAuth API routes
            if (pathname.startsWith('/api/auth')) return true;

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                // Unauthenticated: redirect to login (not just return false)
                return Response.redirect(new URL('/login', nextUrl));
            }

            if (isOnRoot) {
                // Root: redirect based on auth state
                if (isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl));
                return Response.redirect(new URL('/login', nextUrl));
            }

            if (isLoggedIn && isOnLogin) {
                // Already logged in, send to dashboard
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
