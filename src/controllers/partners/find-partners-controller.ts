import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IPartnerRepository } from '../../repositories/partner/ipartner-repository.d.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

extendZodWithOpenApi(z)

export const findPartnersSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindPartnersController {
  constructor(private readonly partnerRepository: IPartnerRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findPartnersSchema.parse(req.query)

    const offset = limit * page - limit

    const [partners, totalPartners] = await Promise.all([
      this.partnerRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.partnerRepository.count({
        filter,
      }),
    ])

    const totalPages = Math.max(Math.ceil(totalPartners / limit), 1)

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      partners,
    })
  }
}
