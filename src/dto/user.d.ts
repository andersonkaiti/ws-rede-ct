import type { UserRole } from '@prisma/client'

export interface ICreateUserDTO {
  name: string
  emailAddress: string
  passwordHash: string
}

export interface IUpdateUserDTO {
  id: string
  name?: string
  passwordHash?: string
  avatarUrl?: string
  role?: UserRole
}
