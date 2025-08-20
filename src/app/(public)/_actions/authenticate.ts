'use server'

import { signIn } from '@/lib/auth'

type ProviderTypes = 'github'

export async function handleRegister(provider: ProviderTypes) {
  await signIn(provider, { redirectTo: '/dashboard' })
}
