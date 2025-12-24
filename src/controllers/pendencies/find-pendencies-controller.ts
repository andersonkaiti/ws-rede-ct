import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { PendencyStatus } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findPendenciesControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(PendencyStatus).default('PENDING'),
  userId: z.uuid().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindPendenciesController {
  constructor(private readonly pendencyRepository: IPendencyRepository) {}

  async handle(req: Request, res: Response) {
    const { limit, orderBy, page, ...filter } =
      findPendenciesControllerSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [pendencies, totalPendencies] = await Promise.all([
      this.pendencyRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter: {
          orderBy,
          ...filter,
        },
      }),

      this.pendencyRepository.count({
        filter,
      }),
    ])

    const totalPages = limit
      ? Math.max(Math.ceil(totalPendencies / limit), 1)
      : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      pendencies,
    })
  }
}
