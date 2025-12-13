import type { News, User } from '../../../config/database/generated/client.ts'
import type {
  ICountNewsDTO,
  IFindAllDTO,
  IFindNewsByAuthorIdDTO,
  INewsDTO,
  IUpdateNewsDTO,
} from '../../dto/news.ts'

interface IReturnedNews extends Omit<News, 'authorId'> {}

interface IReturnedNewsWithAuthor extends IReturnedNews {
  author: User
}

export interface INewsRepository {
  create(news: INewsDTO): Promise<void>
  find(data: IFindAllDTO): Promise<IReturnedNewsWithAuthor[] | null>
  findById(id: string): Promise<IReturnedNewsWithAuthor | null>
  findByAuthorId(data: IFindNewsByAuthorIdDTO): Promise<IReturnedNews[] | null>
  update(news: IUpdateNewsDTO): Promise<void>
  delete(id: string): Promise<void>
  count(data: ICountNewsDTO): Promise<number>
}
