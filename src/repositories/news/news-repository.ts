import type { News, Prisma, PrismaClient } from '@prisma/client'
import type {
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

  async findAll(): Promise<News[]> {
    return await this.prisma.news.findMany({
      include: {
        author: true,
      },
      orderBy: {
        created_at: 'desc',
      },
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
    filter: { updated_at, orderBy = 'updated_at', content, title },
  }: IFindNewsByAuthorIdDTO): Promise<News[]> {
    const where: Prisma.NewsWhereInput = {
      author_id,
    }

    if (updated_at) {
      where.updated_at = {
        equals: new Date(updated_at),
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

    const validOrders: Record<string, string> = {
      created_at: 'created_at',
      updated_at: 'updated_at',
      title: 'title',
      content: 'content',
    }

    const validatedOrder = validOrders[orderBy] || 'updated_at'

    return await this.prisma.news.findMany({
      where,
      orderBy: {
        [validatedOrder]: 'desc',
      },
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
}
