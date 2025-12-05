import type { ScientificArticle } from '@prisma/client'
import type {
  ICountScientificArticlesDTO,
  ICreateScientificArticleDTO,
  IFindScientificArticlesDTO,
} from '../../dto/scientific-article.ts'

export interface IScientificArticlesRepository {
  create(data: ICreateScientificArticleDTO): Promise<ScientificArticle>
  find(data: IFindScientificArticlesDTO): Promise<ScientificArticle[] | null>
  findById(id: string): Promise<ScientificArticle | null>
  count(data: ICountScientificArticlesDTO): Promise<number>
}
