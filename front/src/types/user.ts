import type { UserType } from '#lib/firebase'

export type { UserType }

export type UserProfile = {
  id: string
  createdTime: string
  displayName: string | null
  email: string
  lastSignInTime: string
  userId: string
  avatar: string | null
}
