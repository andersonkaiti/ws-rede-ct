export interface ICreateManagementTeamDTO {
  name: string
  description?: string
  members: {
    userId: string
    role: string
  }[]
}

export interface IFindAllManagementTeamsDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    name?: string
    description?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateManagementTeamDTO {
  id: string
  name?: string
  description?: string
  members?: {
    userId: string
    role: string
  }[]
}

export interface ICountManagementTeamsDTO {
  filter: {
    name?: string
    description?: string
  }
}
