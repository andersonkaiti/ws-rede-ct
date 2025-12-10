import type { ResearchGroup } from '@prisma/client'

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

export interface IUpdateResearchGroupDTO
  extends Partial<Omit<ResearchGroup, 'createdAt' | 'updatedAt'>> {
  id: string
}
