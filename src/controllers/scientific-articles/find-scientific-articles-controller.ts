import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IScientificArticlesRepository } from '../../repositories/scientific-articles/iscientific-articles-repository.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findScientificArticlesControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
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
    const { limit, page, ...filter } =
      findScientificArticlesControllerSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

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

    const totalPages = limit
      ? Math.max(Math.ceil(totalScientificArticles / limit), 1)
      : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      scientificArticles,
    })
  }
}
