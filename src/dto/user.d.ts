import type { User } from '../../config/database/generated/client.ts'

export interface ICreateUserDTO {
  name: string
  emailAddress: string
  passwordHash: string
}

export interface IUpdateUserDTO
  extends Partial<Omit<User, 'createdAt' | 'updatedAt'>> {
  id: string
}
