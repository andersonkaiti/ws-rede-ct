export interface ICreateUserDTO {
  name: string
  emailAddress: string
  passwordHash: string
}

export interface IUpdateUserDTO {
  id: string
  name?: string
  lattesUrl?: string
  orcid?: string
  phone?: string
  avatarUrl?: string
}
