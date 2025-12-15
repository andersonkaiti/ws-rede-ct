import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { PendencyStatus } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

extendZodWithOpenApi(z)

export const findPendenciesControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(PendencyStatus).default('PENDING'),
  userId: z.uuid().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindPendenciesController {
  constructor(private readonly pendencyRepository: IPendencyRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { description, limit, orderBy, page, title, status, userId } =
        findPendenciesControllerSchema.parse(req.query)

      const offset = page * limit - limit

      const [pendencies, totalPendencies] = await Promise.all([
        this.pendencyRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter: {
            title,
            description,
            status,
            orderBy,
            userId,
          },
        }),

        this.pendencyRepository.count({
          filter: {
            title,
            description,
            status,
            userId,
          },
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalPendencies / limit), 1)

      return res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        pendencies,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
