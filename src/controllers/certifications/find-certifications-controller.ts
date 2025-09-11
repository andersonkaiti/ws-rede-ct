import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

const findCertificationsControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  description: z.string().optional(),
  orderBy: z
    .union([z.enum(['asc', 'desc']), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

export class FindCertificationsController {
  constructor(
    private readonly certificationRepository: ICertificationRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = findCertificationsControllerSchema.safeParse({
        page: req.query.page,
        limit: req.query.limit,
        title: req.query.title,
        description: req.query.description,
        authorId: req.query.author_id,
        orderBy: req.query.order_by,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const {
        description,
        limit,
        orderBy = 'desc',
        page,
        title,
      } = parseResult.data

      const offset = page * limit - limit

      const [certifications, totalCertifications] = await Promise.all([
        this.certificationRepository.find({
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
          },
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
      console.log(err)
      if (err instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: err.message,
        })
      }
    }
  }
}
