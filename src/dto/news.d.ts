export interface INewsDTO {
  title: string
  content: string
  author_id: string
  image_url?: string
}

export interface IUpdateNewsDTO extends Omit<INewsDTO, 'author_id'> {
  id: string
}

export interface IFindAllDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    content?: string
    author_id?: string
    order_by?: 'asc' | 'desc'
  }
}

export interface IFindNewsByAuthorIdDTO {
  author_id: string
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    order_by?: 'asc' | 'desc'
    title?: string
    content?: string
  }
}

export interface ICountNewsDTO {
  filter: {
    title?: string
    content?: string
    author_id?: string
  }
}
