import type { ReferenceCenterTeamMember } from '@prisma/client'

export interface ICreateReferenceCenterTeamMemberDTO {
  role: string
  description?: string
  userId: string
}

export interface IFindAllReferenceCenterTeamMembersDTO {
  pagination?: {
    offset: number
    limit: number
  }
  filter: {
    role?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateReferenceCenterTeamMemberDTO
  extends Partial<Omit<ReferenceCenterTeamMember, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountReferenceCenterTeamMembersDTO {
  filter: {
    role?: string
  }
}
