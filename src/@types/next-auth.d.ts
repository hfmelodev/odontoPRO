import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user']
  }
}

interface User {
  id: string
  name: string
  email: string
  emailVerified?: string | null | undefined | boolean
  image?: string
  address?: string | null
  phone?: string | null
  status: boolean
  timezone: string | null
  times: string[]
  stripeCustomerId?: string | null
  createdAt: string
  updatedAt: string
}
