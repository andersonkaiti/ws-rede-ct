import type { Prisma, PrismaClient } from '@prisma/client'
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

  async create({ authorId, ...news }: INewsDTO) {
    return await this.prisma.news.create({
      data: {
        ...news,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { authorId, content, title, orderBy = 'desc' },
  }: IFindAllDTO) {
    const where: Prisma.NewsWhereInput = {}

    if (authorId) {
      where.authorId = {
        contains: authorId,
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
      where,
      omit: {
        authorId: true,
      },
      include: {
        author: true,
      },
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.news.findUnique({
      where: {
        id,
      },
      omit: {
        authorId: true,
      },
      include: {
        author: true,
      },
    })
  }

  async findByAuthorId({
    authorId,
    pagination: { offset, limit },
    filter: { orderBy = 'desc', content, title },
  }: IFindNewsByAuthorIdDTO) {
    const where: Prisma.NewsWhereInput = {
      authorId,
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
      omit: {
        authorId: true,
      },
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async update(news: IUpdateNewsDTO) {
    return await this.prisma.news.update({
      where: {
        id: news.id,
      },
      data: {
        title: news.title,
        content: news.content,
        imageUrl: news.imageUrl,
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

  async count({ filter: { authorId, content, title } }: ICountNewsDTO) {
    const where: Prisma.NewsWhereInput = {}

    if (authorId) {
      where.authorId = {
        contains: authorId,
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
