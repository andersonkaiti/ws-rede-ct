import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IScientificArticlesRepository } from '../../repositories/scientific-articles/iscientific-articles-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

extendZodWithOpenApi(z)

export const findScientificArticlesControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  author: z.string().optional(),
  journal: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindScientificArticlesController {
  constructor(
    private readonly scientificArticlesRepository: IScientificArticlesRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { limit, page, ...filter } =
        findScientificArticlesControllerSchema.parse(req.query)

      const offset = page * limit - limit

      const [scientificArticles, totalScientificArticles] = await Promise.all([
        this.scientificArticlesRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter,
        }),

        this.scientificArticlesRepository.count({
          filter,
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalScientificArticles / limit), 1)

      return res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        scientificArticles,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
