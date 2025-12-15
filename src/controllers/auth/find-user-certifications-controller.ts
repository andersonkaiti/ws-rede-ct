import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

extendZodWithOpenApi(z)

export const findAuthenticatedUserCertificationsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  description: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindAuthenticatedUserCertificationsController {
  constructor(
    private readonly certificationRepository: ICertificationRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { title, description, limit, orderBy, page } =
        findAuthenticatedUserCertificationsSchema.parse(req.query)

      const offset = page * limit - limit

      const authenticatedUserId = req.user.id

      const [certifications, count] = await Promise.all([
        this.certificationRepository.findByUserId({
          userId: authenticatedUserId,
          pagination: {
            offset,
            limit,
          },
          filter: {
            title,
            description,
            orderBy,
          },
        }),
        this.certificationRepository.count({
          filter: {
            title,
            description,
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
        totalCertifications: count,
        certifications,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
