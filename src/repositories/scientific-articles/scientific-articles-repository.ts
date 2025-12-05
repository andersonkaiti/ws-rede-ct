import type { Prisma, PrismaClient, ScientificArticle } from '@prisma/client'
import type {
  ICountScientificArticlesDTO,
  ICreateScientificArticleDTO,
  IFindScientificArticlesDTO,
  IUpdateScientificArticleDTO,
} from '../../dto/scientific-article.ts'
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

  async find({
    pagination: { offset, limit },
    filter: { title, author, journal, orderBy },
  }: IFindScientificArticlesDTO): Promise<ScientificArticle[]> {
    const where: Prisma.ScientificArticleWhereInput = {}

    const or: Prisma.ScientificArticleWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (author) {
      or.push({
        author: {
          contains: author,
          mode: 'insensitive',
        },
      })
    }

    if (journal) {
      or.push({
        journal: {
          contains: journal,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.scientificArticle.findMany({
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string): Promise<ScientificArticle | null> {
    return await this.prisma.scientificArticle.findFirst({
      where: {
        id,
      },
    })
  }

  async update({
    id,
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
  }: IUpdateScientificArticleDTO): Promise<void> {
    await this.prisma.scientificArticle.update({
      where: {
        id,
      },
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

  async count({
    filter: { title, author, journal },
  }: ICountScientificArticlesDTO): Promise<number> {
    const where: Prisma.ScientificArticleWhereInput = {}

    const or: Prisma.ScientificArticleWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (author) {
      or.push({
        author: {
          contains: author,
          mode: 'insensitive',
        },
      })
    }

    if (journal) {
      or.push({
        journal: {
          contains: journal,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.scientificArticle.count({
      where,
    })
  }
}
