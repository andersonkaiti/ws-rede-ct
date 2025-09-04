export interface IUserCreatedEvent {
  data: IData
  event_attributes: IEventAttributes
  object: string
  timestamp: number
  type: string
}

export interface IData {
  birthday?: number
  created_at: number
  email_addresses: IEmailAddress[]
  external_accounts: unknown[]
  external_id: string
  first_name: string
  gender: string
  id: string
  image_url: string
  last_name: string
  last_sign_in_at: number
  object: string
  password_enabled: boolean
  phone_numbers: unknown[]
  primary_email_address_id: string
  primary_phone_number_id: null
  primary_web3_wallet_id: null
  private_metadata: IMetadata
  profile_image_url: string
  public_metadata: IMetadata
  two_factor_enabled: boolean
  unsafe_metadata: IMetadata
  updated_at: number
  username: null
  web3_wallets: unknown[]
}

export interface IEmailAddress {
  email_address: string
  id: string
  linked_to: unknown[]
  object: string
  verification: IVerification
}

export interface IVerification {
  status: string
  strategy: string
}

export type IMetadata = Record<string, unknown>

export interface IEventAttributes {
  http_request: IHTTPRequest
}

export interface IHTTPRequest {
  client_ip: string
  user_agent: string
}
