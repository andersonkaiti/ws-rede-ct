import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 7

extendZodWithOpenApi(z)

export const findNewsByAuthorSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindNewsByAuthorController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, id, ...filter } = findNewsByAuthorSchema.parse(
        req.query,
      )

      const offset = limit * page - limit

      const [news, totalUserNews] = await Promise.all([
        this.newsRepository.findByAuthorId({
          authorId: id,
          pagination: {
            offset,
            limit,
          },
          filter,
        }),

        this.newsRepository.count({
          filter: {
            authorId: id,
            ...filter,
          },
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalUserNews / limit), 1)

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
