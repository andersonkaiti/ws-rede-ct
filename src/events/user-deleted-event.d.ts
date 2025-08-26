export interface IUserDeletedEvent {
  data: Data
  event_attributes: EventAttributes
  object: string
  timestamp: number
  type: string
}

export interface Data {
  deleted: boolean
  id: string
  object: string
}

export interface EventAttributes {
  http_request: HTTPRequest
}

export interface HTTPRequest {
  client_ip: string
  user_agent: string
}
