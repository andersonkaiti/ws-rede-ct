import type { News } from '@prisma/client'
import type {
  ICountNewsDTO,
  IFindAllDTO,
  IFindNewsByAuthorIdDTO,
  INewsDTO,
  IUpdateNewsDTO,
} from '../../dto/news.ts'

export interface INewsRepository {
  create(news: INewsDTO): Promise<News>
  findAll(data: IFindAllDTO): Promise<News[]>
  findById(id: string): Promise<News | null>
  findByAuthorId(data: IFindNewsByAuthorIdDTO): Promise<News[]>
  update(news: IUpdateNewsDTO): Promise<News>
  delete(id: string): Promise<void>
  count(data: ICountNewsDTO): Promise<number>
}
