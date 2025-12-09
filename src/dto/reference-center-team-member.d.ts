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

export interface ICountReferenceCenterTeamMembersDTO {
  filter: {
    role?: string
  }
}
