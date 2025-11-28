import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IRegionalCongressRepository } from '../../repositories/regional-congress/iregional-congress-repository.d.ts'

extendZodWithOpenApi(z)

export const findRegionalCongressesSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  title: z.string().optional(),
  edition: z.coerce.number().int().positive().optional(),
  location: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).optional().default('desc'),
})

export class FindRegionalCongressesController {
  constructor(
    private readonly regionalCongressRepository: IRegionalCongressRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, orderBy, ...filter } =
        findRegionalCongressesSchema.parse(req.query)

      const offset = (page - 1) * limit

      const congresses = await this.regionalCongressRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter: {
          ...filter,
          orderBy,
        },
      })

      if (!congresses) {
        throw new NotFoundError('Congressos regionais não encontrados')
      }

      const total = await this.regionalCongressRepository.count({
        filter,
      })

      return res.status(HttpStatus.OK).json({
        data: congresses,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
