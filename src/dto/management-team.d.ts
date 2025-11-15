import type { ManagementTeam } from '@prisma/client'

export interface ICreateManagementTeamDTO {
  name: string
  description?: string
  members: {
    userId: string
    role: string
    order?: number
  }[]
}

export interface IFindAllManagementTeamsDTO {
  filter: {
    name?: string
    description?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateManagementTeamDTO
  extends Partial<Omit<ManagementTeam, 'createdAt' | 'updatedAt'>> {
  id: string
  members?: {
    userId: string
    role: string
    order?: number
  }[]
}

export interface ICountManagementTeamsDTO {
  filter: {
    name?: string
    description?: string
  }
}
