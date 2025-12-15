import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

extendZodWithOpenApi(z)

export const findCertificationsControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  description: z.string().optional(),
  userId: z.uuid().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindCertificationsController {
  constructor(
    private readonly certificationRepository: ICertificationRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { limit, page, ...filter } =
        findCertificationsControllerSchema.parse(req.query)

      const offset = page * limit - limit

      const [certifications, totalCertifications] = await Promise.all([
        this.certificationRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter,
        }),

        this.certificationRepository.count({
          filter,
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalCertifications / limit), 1)

      return res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        certifications,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
