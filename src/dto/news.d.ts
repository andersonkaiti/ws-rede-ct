export interface INewsDTO {
  title: string
  content: string
  authorId: string
  imageUrl: string
}

export interface IUpdateNewsDTO {
  id: string
  title: string
  content: string
  imageUrl?: string
}

export interface IFindAllDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    content?: string
    authorId?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IFindNewsByAuthorIdDTO {
  authorId: string
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    orderBy?: 'asc' | 'desc'
    title?: string
    content?: string
  }
}

export interface ICountNewsDTO {
  filter: {
    title?: string
    content?: string
    authorId?: string
  }
}
