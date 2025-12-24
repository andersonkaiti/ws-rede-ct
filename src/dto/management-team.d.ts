import type { ManagementTeam } from '../../config/database/generated/client.ts'

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
  pagination: {
    offset?: number
    limit?: number
  }
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
