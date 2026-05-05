// The middleware (auth.config.ts) handles all redirects for '/'
// - Logged in  → /dashboard
// - Logged out → /login
// This component is never actually rendered.
export default function Home() {
    return null
}
