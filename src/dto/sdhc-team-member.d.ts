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

export interface IUpdateSDHCTeamMemberDTO {
  id: string
  role?: string
  description?: string
  userId?: string
  order?: number
}

export interface ICountSDHCTeamMembersDTO {
  filter: {
    role?: string
  }
}
