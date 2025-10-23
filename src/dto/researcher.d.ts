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
