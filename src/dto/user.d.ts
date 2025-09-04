export interface IEmailAddress {
  email_address: string
  id: string
  linked_to: unknown[]
}

export interface IUserDTO {
  id: string
  first_name: string
  last_name?: string
  image_url?: string
  profile_image_url?: string
  created_at: number
  updated_at: number
  email_addresses: IEmailAddress[]
}

export type IUserDeletedDTO = IUserDTO['id']
