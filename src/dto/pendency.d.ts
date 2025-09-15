export interface ICreatePendencyDTO {
  title: string
  description?: string
  status: 'PENDING' | 'PAID'
  dueDate?: Date
  documentUrl: string
  userId: string
}

export interface IFindPendenciesDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    description?: string
    status?: 'PENDING' | 'PAID'
    orderBy?: 'asc' | 'desc'
    userId?: string
  }
}

export interface IUpdatePendencyDTO {
  id: string
  title: string
  description?: string
  dueDate?: Date
  documentUrl: string
}

export interface ICountPendenciesDTO {
  filter: {
    title?: string
    description?: string
    status?: 'PENDING' | 'PAID'
    userId?: string
  }
}
