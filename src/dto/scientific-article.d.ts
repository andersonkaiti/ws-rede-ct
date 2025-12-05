export interface ICreateScientificArticleDTO {
  title: string
  author: string
  journal?: string
  volume?: string
  edition?: string
  pageStart?: number
  pageEnd?: number
  startDate: Date
  endDate: Date
  city?: string
  state?: string
  country?: string
  publisher?: string
  description?: string
  year?: number
  accessUrl?: string
}

export interface IFindScientificArticlesDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    author?: string
    journal?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface ICountScientificArticlesDTO {
  filter: {
    title?: string
    author?: string
    journal?: string
  }
}
