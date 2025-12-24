import type { WorkGroupTeamMember } from '../../config/database/generated/client.ts'

export interface ICreateWorkGroupTeamMemberDTO {
  role: string
  description?: string
  userId: string
}

export interface IFindAllWorkGroupTeamMembersDTO {
  pagination: {
    offset?: number
    limit?: number
  }
  filter: {
    role?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateWorkGroupTeamMemberDTO
  extends Partial<Omit<WorkGroupTeamMember, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountWorkGroupTeamMembersDTO {
  filter: {
    role?: string
  }
}
