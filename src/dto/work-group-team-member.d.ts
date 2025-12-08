import type { WorkGroupTeamMember } from '@prisma/client'

export interface ICreateWorkGroupTeamMemberDTO {
  role: string
  description?: string
  userId: string
}

export interface IFindAllWorkGroupTeamMembersDTO {
  pagination?: {
    offset: number
    limit: number
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
