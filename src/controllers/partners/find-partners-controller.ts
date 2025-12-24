import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IPartnerRepository } from '../../repositories/partner/ipartner-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findPartnersSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindPartnersController {
  constructor(private readonly partnerRepository: IPartnerRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findPartnersSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

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

    const totalPages = limit ? Math.max(Math.ceil(totalPartners / limit), 1) : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      partners,
    })
  }
}
