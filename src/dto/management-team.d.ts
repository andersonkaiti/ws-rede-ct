export interface ICreateManagementTeamDTO {
  name: string
  description?: string
  members: {
    userId: string
    role: string
    order?: number
  }[]
}

export interface IFindAllManagementTeamsDTO {
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
    order?: number
  }[]
}

export interface ICountManagementTeamsDTO {
  filter: {
    name?: string
    description?: string
  }
}
