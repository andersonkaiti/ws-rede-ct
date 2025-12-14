import type { ResearchGroup } from '../../config/database/generated/client.ts'

export interface ICreateResearchGroupDTO {
  name: string
  acronym?: string
  description?: string
  url?: string
  logoUrl?: string
  foundedAt: Date
  scope?: string
  email?: string
  leaderId: string
  deputyLeaderId: string
}

export interface IFindResearchGroupsDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    acronym?: string
    description?: string
    leader?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateResearchGroupDTO
  extends Partial<Omit<ResearchGroup, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountResearchGroupsDTO {
  filter: {
    name?: string
    acronym?: string
    description?: string
    leader?: string
  }
}
