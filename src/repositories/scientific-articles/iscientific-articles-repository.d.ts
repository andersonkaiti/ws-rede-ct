import type { ScientificArticle } from '@prisma/client'
import type { ICreateScientificArticleDTO } from '../../dto/scientific-article.ts'

export interface IScientificArticlesRepository {
  create(data: ICreateScientificArticleDTO): Promise<ScientificArticle>
}
