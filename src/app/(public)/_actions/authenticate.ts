'use server'

import { signIn } from '@/lib/auth'

type ProviderTypes = 'github' | 'google'

export async function handleRegister(provider: ProviderTypes) {
  await signIn(provider, { redirectTo: '/dashboard' })
}
