export interface ICreateCheckingAccountDTO {
  type: 'EXCLUSIVE_REDECT_USE' | 'EVENTS' | 'COLLOQUIUM'
  balanceInCents: number
}

export interface IUpdateCheckingAccountDTO {
  id: string
  type?: 'EXCLUSIVE_REDECT_USE' | 'EVENTS' | 'COLLOQUIUM'
  balanceInCents?: number
}

export interface IFindAllCheckingAccountDTO {
  pagination: {
    offset?: number
    limit?: number
  }
  filter: {
    type?: 'EXCLUSIVE_REDECT_USE' | 'EVENTS' | 'COLLOQUIUM'
    orderBy: 'asc' | 'desc'
  }
}

export interface ICountCheckingAccountDTO {
  filter: {
    type?: 'EXCLUSIVE_REDECT_USE' | 'EVENTS' | 'COLLOQUIUM'
  }
}
