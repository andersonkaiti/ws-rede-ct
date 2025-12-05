import type { PrismaClient, ScientificArticle } from '@prisma/client'
import type { ICreateScientificArticleDTO } from '../../dto/scientific-article.ts'
import type { IScientificArticlesRepository } from './iscientific-articles-repository.ts'

export class ScientificArticlesRepository
  implements IScientificArticlesRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    title,
    author,
    journal,
    volume,
    edition,
    pageStart,
    pageEnd,
    startDate,
    endDate,
    city,
    state,
    country,
    publisher,
    description,
    year,
    accessUrl,
  }: ICreateScientificArticleDTO): Promise<ScientificArticle> {
    return await this.prisma.scientificArticle.create({
      data: {
        title,
        author,
        journal,
        volume,
        edition,
        pageStart,
        pageEnd,
        startDate,
        endDate,
        city,
        state,
        country,
        publisher,
        description,
        year,
        accessUrl,
      },
    })
  }
}
