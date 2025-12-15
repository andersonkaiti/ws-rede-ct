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

export interface IFindUsersDTO {
  pagination?: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    emailAddress?: string
    phone?: string
    lattesUrl?: string
    orcid?: string
  }
}

export interface ICountUsersDTO {
  filter: {
    name?: string
    emailAddress?: string
    phone?: string
    lattesUrl?: string
    orcid?: string
  }
}
