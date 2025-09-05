export interface ICreateTeamMemberDTO {
  role: string
  teamId: string
  userId: string
  description?: string
}

export interface IUpdateTeamMemberDTO {
  id: string
  role: string
  userId: string
  description: string
}

export interface IUpdateTeamMembersDTO {
  teamId: string
  members: {
    role: string
    user: {
      id: string
      name: string
    }
  }[]
}
