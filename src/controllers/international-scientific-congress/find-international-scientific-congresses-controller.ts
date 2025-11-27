import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/iinternational-scientific-congress-repository.d.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

extendZodWithOpenApi(z)

export const findInternationalScientificCongressSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  title: z.string().optional(),
  edition: z.coerce.number().int().positive().optional(),
  location: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindInternationalScientificCongressesController {
  constructor(
    private readonly internationalScientificCongressRepository: IInternationalScientificCongressRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, ...filter } =
        findInternationalScientificCongressSchema.parse(req.query)

      const offset = limit * page - limit

      const [congresses, totalCongresses] = await Promise.all([
        this.internationalScientificCongressRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter,
        }),
        this.internationalScientificCongressRepository.count({
          filter,
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalCongresses / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        congresses,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
