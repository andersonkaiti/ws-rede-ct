import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IETPRepository } from '../../repositories/etp/ietp-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findETPsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  code: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindETPsController {
  constructor(private readonly etpRepository: IETPRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findETPsSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [etps, totalETPs] = await Promise.all([
      this.etpRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.etpRepository.count({
        filter,
      }),
    ])

    const totalPages = limit ? Math.max(Math.ceil(totalETPs / limit), 1) : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      etps,
    })
  }
}
