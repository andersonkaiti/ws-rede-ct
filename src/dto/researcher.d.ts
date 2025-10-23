import type { Degree, Seniority } from '@prisma/client'

export interface ICreateResearcherDTO {
  registrationNumber: string
  mainEtps?: string
  formations?: string
  degrees: Degree[]
  occupations: string
  seniority: Seniority
  institutions: string
  biography?: string
  userId: string
}

export interface IFindAllResearchersDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    registrationNumber?: string
    mainEtps?: string
    formations?: string
    degrees?: Degree[]
    occupations?: string
    seniority?: Seniority
    institutions?: string
    biography?: string
    userId?: string
    userName?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface ICountResearchersDTO {
  filter: {
    registrationNumber?: string
    mainEtps?: string
    formations?: string
    degrees?: Degree[]
    occupations?: string
    seniority?: Seniority
    institutions?: string
    biography?: string
    userName?: string
    userId?: string
  }
}
