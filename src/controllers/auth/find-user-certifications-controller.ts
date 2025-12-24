import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findAuthenticatedUserCertificationsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),

  title: z.string().optional(),
  description: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindAuthenticatedUserCertificationsController {
  constructor(
    private readonly certificationRepository: ICertificationRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { title, description, limit, orderBy, page } =
      findAuthenticatedUserCertificationsSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

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

    const totalPages = limit ? Math.max(Math.ceil(count / limit), 1) : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      totalCertifications: count,
      certifications,
    })
  }
}
