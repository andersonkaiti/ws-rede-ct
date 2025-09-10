import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

const findAuthenticatedUserCertificationsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string(),
  description: z.string(),
  orderBy: z
    .union([z.enum(['asc', 'desc']), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

export class FindAuthenticatedUserCertificationsController {
  constructor(
    private readonly certificationRepository: ICertificationRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = findAuthenticatedUserCertificationsSchema.safeParse({
        page: req.query.page,
        limit: req.query.limit,
        title: req.query.title,
        description: req.query.description,
        orderBy: req.query.order_by,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const {
        title,
        description,
        limit,
        orderBy = 'desc',
        page,
      } = parseResult.data

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
        certifications,
      })
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: err.message,
        })
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erro ao buscar certificações.',
      })
    }
  }
}
