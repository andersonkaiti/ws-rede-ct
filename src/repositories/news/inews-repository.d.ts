import type { News } from '@prisma/client'
import type {
  IFindNewsByAuthorIdDTO,
  INewsDTO,
  IUpdateNewsDTO,
} from '../../dto/news.ts'

export interface INewsRepository {
  create(news: INewsDTO): Promise<News>
  findAll(): Promise<News[]>
  findById(id: string): Promise<News | null>
  findByAuthorId(data: IFindNewsByAuthorIdDTO): Promise<News[]>
  update(news: IUpdateNewsDTO): Promise<News>
  delete(id: string): Promise<void>
}
