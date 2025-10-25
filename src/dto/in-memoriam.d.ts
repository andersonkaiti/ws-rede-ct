import type { InMemoriamRole } from '@prisma/client'

export interface ICreateInMemoriamDTO {
  name: string
  birthDate: Date
  deathDate: Date
  biography?: string
  photoUrl?: string
  role: InMemoriamRole
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
