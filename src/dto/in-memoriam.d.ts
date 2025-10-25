import type { InMemoriamRole } from '@prisma/client'

export interface ICreateInMemoriamDTO {
  name: string
  birthDate: Date
  deathDate: Date
  biography?: string
  photoUrl?: string
  role: InMemoriamRole
}

export interface IFindAllInMemoriamDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    biography?: string
    role?: InMemoriamRole
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateInMemoriamDTO {
  id: string
  name?: string
  birthDate?: Date
  deathDate?: Date
  biography?: string
  photoUrl?: string
  role?: InMemoriamRole
}

export interface ICountInMemoriamDTO {
  filter: {
    name?: string
    biography?: string
    role?: InMemoriamRole
  }
}
