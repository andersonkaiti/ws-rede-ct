import type { News, Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountNewsDTO,
  IFindAllDTO,
  IFindNewsByAuthorIdDTO,
  INewsDTO,
  IUpdateNewsDTO,
} from '../../dto/news.ts'
import type { INewsRepository } from './inews-repository.d.ts'

export class NewsRepository implements INewsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    title,
    content,
    author_id,
    image_url,
  }: INewsDTO): Promise<News> {
    return await this.prisma.news.create({
      data: {
        title,
        content,
        author_id,
        image_url,
      },
      include: {
        author: true,
      },
    })
  }

  async findAll({
    pagination: { offset, limit },
    filter: { author_id, content, title, order_by = 'desc' },
  }: IFindAllDTO): Promise<News[]> {
    const where: Prisma.NewsWhereInput = {}

    if (author_id) {
      where.author_id = {
        contains: author_id,
        mode: 'insensitive',
      }
    }

    const or: Prisma.NewsWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (content) {
      or.push({
        content: {
          contains: content,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.news.findMany({
      include: {
        author: true,
      },
      where,
      orderBy: {
        updated_at: order_by,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string): Promise<News | null> {
    return await this.prisma.news.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    })
  }

  async findByAuthorId({
    author_id,
    pagination: { offset, limit },
    filter: { order_by = 'desc', content, title },
  }: IFindNewsByAuthorIdDTO): Promise<News[]> {
    const where: Prisma.NewsWhereInput = {
      author_id,
    }

    const or: Prisma.NewsWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (content) {
      or.push({
        content: {
          contains: content,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.news.findMany({
      where,
      orderBy: {
        updated_at: order_by,
      },
      skip: offset,
      take: limit,
    })
  }

  async update(news: IUpdateNewsDTO): Promise<News> {
    return await this.prisma.news.update({
      where: {
        id: news.id,
      },
      data: {
        title: news.title,
        content: news.content,
        ...(news.image_url && {
          image_url: news.image_url,
        }),
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.news.delete({
      where: {
        id,
      },
    })
  }

  async count({
    filter: { author_id, content, title },
  }: ICountNewsDTO): Promise<number> {
    const where: Prisma.NewsWhereInput = {}

    if (author_id) {
      where.author_id = {
        contains: author_id,
        mode: 'insensitive',
      }
    }

    const or: Prisma.NewsWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (content) {
      or.push({
        content: {
          contains: content,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.news.count({
      where,
    })
  }
}
