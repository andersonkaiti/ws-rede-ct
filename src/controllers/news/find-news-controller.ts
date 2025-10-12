import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

extendZodWithOpenApi(z)

export const findNewsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  content: z.string().optional(),
  authorId: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, authorId, content, orderBy, title } =
        findNewsSchema.parse(req.query)

      const offset = limit * page - limit

      const [news, totalNews] = await Promise.all([
        this.newsRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter: {
            authorId,
            content,
            title,
            orderBy,
          },
        }),

        this.newsRepository.count({
          filter: {
            title,
            content,
            authorId,
          },
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalNews / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        news,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
