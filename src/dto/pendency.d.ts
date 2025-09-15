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

export interface ICountPendenciesDTO {
  filter: {
    title?: string
    description?: string
    status?: 'PENDING' | 'PAID'
    userId?: string
  }
}
