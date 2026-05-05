'use server'

import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // NextAuth v5: redirectTo must be inside the second argument object
        const data = Object.fromEntries(formData)
        await signIn('credentials', { ...data, redirectTo: '/dashboard' })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciais invalidas.'
                default:
                    return 'Algo deu errado.'
            }
        }
        throw error
    }
}

export async function logout() {
    await signOut({ redirectTo: '/login' })
}
