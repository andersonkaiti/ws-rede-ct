export interface IUserDTO {
  id: string
  first_name: string
  last_name?: string
  image_url?: string
  profile_image_url?: string
  created_at: Date
  updated_at: Date
  email_addresses: IEmailAddress[]
}

export interface ITeamMemberDTO {
  role: string
  user: IUserDTO
}

export interface ICreateTeamDTO {
  name: string
  type: string
  members: ITeamMemberDTO[]
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
