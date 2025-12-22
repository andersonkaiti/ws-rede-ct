import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IRedeCTHighlightRepository } from '../../repositories/redect-highlight/iredect-highlight-repository.d.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

extendZodWithOpenApi(z)

export const findRedeCTHighlightsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  type: z.enum(['PERSON', 'INSTITUTION']).optional(),
  description: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindRedeCTHighlightsController {
  constructor(
    private readonly redectHighlightRepository: IRedeCTHighlightRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findRedeCTHighlightsSchema.parse(
      req.query,
    )

    const offset = limit * page - limit

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

    const totalPages = Math.max(Math.ceil(totalHighlights / limit), 1)

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      highlights,
    })
  }
}
