'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, DollarSign, Package, Users, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/financeiro', label: 'Financeiro', icon: DollarSign },
    { href: '/dashboard/estoque', label: 'Estoque', icon: Package },
    // { href: '/dashboard/usuarios', label: 'Usuários', icon: Users }, // Admin only later
]

export function AppSidebar({ className }: { className?: string }) {
    const pathname = usePathname()
    const router = useRouter()

    async function handleSignOut() {
        await signOut({ redirect: false })
        router.push('/login')
    }

    return (
        <aside className={cn("hidden md:flex flex-col w-64 border-r bg-white dark:bg-zinc-900", className)}>
            <div className="h-16 flex items-center px-6 border-b">
                <span className="font-bold text-lg">Social Church</span>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t">
                <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={handleSignOut}
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </Button>
            </div>
        </aside>
    )
}
