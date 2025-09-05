export interface ICreateTeamDTO {
  name: string
  type: string
  members: {
    role: string
    user: {
      id: string
      name: string
    }
  }[]
}

export interface IIncomingMembers {
  id: string
  role: string
  user: {
    id: string
    name: string
  }
}

export interface IUpdateTeamDTO {
  id: string
  name: string
}

export interface IFindByTypeDTO {
  type: string
  filter: {
    name?: string
  }
}
