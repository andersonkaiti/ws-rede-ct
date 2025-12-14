import type {
  InMemoriam,
  InMemoriamRole,
} from '../../config/database/generated/client.ts'

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

export interface IUpdateInMemoriamDTO
  extends Partial<Omit<InMemoriam, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountInMemoriamDTO {
  filter: {
    name?: string
    biography?: string
    role?: InMemoriamRole
  }
}
