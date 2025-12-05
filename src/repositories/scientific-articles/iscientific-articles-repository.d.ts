import type { ScientificArticle } from '@prisma/client'
import type {
  ICountScientificArticlesDTO,
  ICreateScientificArticleDTO,
  IFindScientificArticlesDTO,
  IUpdateScientificArticleDTO,
} from '../../dto/scientific-article.ts'

export interface IScientificArticlesRepository {
  create(data: ICreateScientificArticleDTO): Promise<ScientificArticle>
  find(data: IFindScientificArticlesDTO): Promise<ScientificArticle[] | null>
  findById(id: string): Promise<ScientificArticle | null>
  update(data: IUpdateScientificArticleDTO): Promise<void>
  deleteById(id: string): Promise<void>
  count(data: ICountScientificArticlesDTO): Promise<number>
}
