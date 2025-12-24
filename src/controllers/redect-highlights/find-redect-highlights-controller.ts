import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IRedeCTHighlightRepository } from '../../repositories/redect-highlight/iredect-highlight-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findRedeCTHighlightsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  type: z.enum(['PERSON', 'INSTITUTION']).optional(),
  description: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindRedeCTHighlightsController {
  constructor(
    private readonly redectHighlightRepository: IRedeCTHighlightRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findRedeCTHighlightsSchema.parse(
      req.query,
    )

    const offset = limit ? limit * page - limit : undefined

    const [highlights, totalHighlights] = await Promise.all([
      this.redectHighlightRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.redectHighlightRepository.count({
        filter,
      }),
    ])

    const totalPages = limit
      ? Math.max(Math.ceil(totalHighlights / limit), 1)
      : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      highlights,
    })
  }
}
