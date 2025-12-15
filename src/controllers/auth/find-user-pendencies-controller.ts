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

export const findAuthenticatedUserPendenciesSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(PendencyStatus).default('PENDING'),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindAuthenticatedUserPendenciesController {
  constructor(private readonly pendencyRepository: IPendencyRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { limit, page, ...filter } =
        findAuthenticatedUserPendenciesSchema.parse(req.query)

      const offset = page * limit - limit

      const authenticatedUserId = req.user.id

      const [pendencies, count] = await Promise.all([
        this.pendencyRepository.findByUserId({
          userId: authenticatedUserId,
          pagination: {
            offset,
            limit,
          },
          filter,
        }),
        this.pendencyRepository.count({
          filter: {
            ...filter,
            userId: authenticatedUserId,
          },
        }),
      ])

      const totalPages = Math.max(Math.ceil(count / limit), 1)

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
