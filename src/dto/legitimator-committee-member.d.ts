import type { LegitimatorCommitteeMember } from '@prisma/client'

export interface ICreateLegitimatorCommitteeMemberDTO {
  role: string
  description?: string
  userId: string
  order?: number
}

export interface IFindAllLegitimatorCommitteeMembersDTO {
  filter: {
    role?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateLegitimatorCommitteeMemberDTO
  extends Partial<Omit<LegitimatorCommitteeMember, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountLegitimatorCommitteeMembersDTO {
  filter: {
    role?: string
  }
}
