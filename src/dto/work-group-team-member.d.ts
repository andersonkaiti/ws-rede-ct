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

export interface ICountWorkGroupTeamMembersDTO {
  filter: {
    role?: string
  }
}
