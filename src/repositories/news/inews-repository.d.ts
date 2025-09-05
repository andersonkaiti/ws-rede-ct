import type { News, User } from '@prisma/client'
import type {
  ICountNewsDTO,
  IFindAllDTO,
  IFindNewsByAuthorIdDTO,
  INewsDTO,
  IUpdateNewsDTO,
} from '../../dto/news.ts'

type ReturnedNews = Omit<News, 'authorId'>

type ReturnedNewsWithAuthor = ReturnedNews & {
  author: User
}

export interface INewsRepository {
  create(news: INewsDTO): Promise<News>
  find(data: IFindAllDTO): Promise<ReturnedNewsWithAuthor[] | null>
  findById(id: string): Promise<ReturnedNewsWithAuthor | null>
  findByAuthorId(data: IFindNewsByAuthorIdDTO): Promise<ReturnedNews[] | null>
  update(news: IUpdateNewsDTO): Promise<News>
  delete(id: string): Promise<void>
  count(data: ICountNewsDTO): Promise<number>
}
