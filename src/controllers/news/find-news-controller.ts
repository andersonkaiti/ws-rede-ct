import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findNewsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  authorId: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findNewsSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [news, totalNews] = await Promise.all([
      this.newsRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),

      this.newsRepository.count({
        filter,
      }),
    ])

    const totalPages = limit ? Math.max(Math.ceil(totalNews / limit), 1) : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      news,
    })
  }
}
