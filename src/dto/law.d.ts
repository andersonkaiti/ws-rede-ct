export interface ICreateLawDTO {
  title: string
  link: string
  country: string
}

export interface IFindAllLawsDTO {
  pagination?: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    country?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface ICountLawsDTO {
  filter: {
    title?: string
    country?: string
  }
}
