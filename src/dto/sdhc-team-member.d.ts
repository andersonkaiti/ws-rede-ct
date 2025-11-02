export interface ICreateSDHCTeamMemberDTO {
  role: string
  description?: string
  userId: string
}

export interface IFindAllSDHCTeamMembersDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    role?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface ICountSDHCTeamMembersDTO {
  filter: {
    role?: string
  }
}
