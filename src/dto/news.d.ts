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
  title?: string
  content?: string
  author_id?: string
  order_by?: 'asc' | 'desc'
}

export interface IFindNewsByAuthorIdDTO {
  author_id: string
  filter: {
    order_by?: string
    title?: string
    content?: string
  }
}
