import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { InMemoriamRole } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IInMemoriamRepository } from '../../repositories/in-memoriam/iin-memoriam-repository.js'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

extendZodWithOpenApi(z)

export const findInMemoriamSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  name: z.string().optional(),
  biography: z.string().optional(),
  role: z.enum(InMemoriamRole).optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindInMemoriamController {
  constructor(private readonly inMemoriamRepository: IInMemoriamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, ...filter } = findInMemoriamSchema.parse(req.query)

      const offset = limit * page - limit

      const [inMemoriam, totalInMemoriams] = await Promise.all([
        this.inMemoriamRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter,
        }),
        this.inMemoriamRepository.count({
          filter,
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalInMemoriams / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        inMemoriam,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
