import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IRegionalCongressRepository } from '../../repositories/regional-congress/iregional-congress-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findRegionalCongressesSchema = z.object({
  page: z.coerce.number().default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  title: z.string().optional(),
  edition: z.coerce.number().int().positive().optional(),
  location: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindRegionalCongressesController {
  constructor(
    private readonly regionalCongressRepository: IRegionalCongressRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { page, limit, orderBy, ...filter } =
      findRegionalCongressesSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [congresses, totalCongresses] = await Promise.all([
      this.regionalCongressRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter: {
          ...filter,
          orderBy,
        },
      }),
      this.regionalCongressRepository.count({
        filter,
      }),
    ])

    const totalPages = limit ? Math.ceil(totalCongresses / limit) : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      limit,
      offset,
      congresses,
    })
  }
}
