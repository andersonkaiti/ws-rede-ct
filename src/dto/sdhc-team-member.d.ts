import type { SDHCTeamMember } from '../../config/database/generated/client.ts'

export interface ICreateSDHCTeamMemberDTO {
  role: string
  description?: string
  userId: string
  order?: number
}

export interface IFindAllSDHCTeamMembersDTO {
  filter: {
    role?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateSDHCTeamMemberDTO
  extends Partial<Omit<SDHCTeamMember, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountSDHCTeamMembersDTO {
  filter: {
    role?: string
  }
}
