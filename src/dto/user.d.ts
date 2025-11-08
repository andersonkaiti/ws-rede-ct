import type { User } from '@prisma/client'

export interface ICreateUserDTO {
  name: string
  emailAddress: string
  passwordHash: string
}

export interface IUpdateUserDTO
  extends Partial<Omit<User, 'createdAt' | 'updatedAt'>> {
  id: string
}
