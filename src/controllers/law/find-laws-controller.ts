import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ILawRepository } from '../../repositories/law/ilaw-repository.d.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

extendZodWithOpenApi(z)

export const findLawsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  title: z.string().optional(),
  country: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindLawsController {
  constructor(private readonly lawRepository: ILawRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findLawsSchema.parse(req.query)

    const offset = limit * page - limit

    const [laws, totalLaws] = await Promise.all([
      this.lawRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.lawRepository.count({
        filter,
      }),
    ])

    const totalPages = Math.max(Math.ceil(totalLaws / limit), 1)

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      laws,
    })
  }
}
