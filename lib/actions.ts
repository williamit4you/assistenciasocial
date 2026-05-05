'use server'

import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData, { redirectTo: '/dashboard' })
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
