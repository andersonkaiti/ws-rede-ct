import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IInternationalScientificCongressPartnerRepository } from '../../repositories/international-scientific-congress/partner/international-scientific-congress-gallery-repository-partner-repository.js'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findInternationalScientificCongressPartnersByCongressIdSchema =
  z.object({
    id: z.uuid(),
    page: z.coerce.number().min(1).default(DEFAULT_PAGE),
    limit: z.coerce.number().min(1).optional(),
    name: z.string().optional(),
  })

export class FindInternationalScientificCongressPartnersByCongressIdController {
  constructor(
    private readonly internationalScientificCongressPartnerRepository: IInternationalScientificCongressPartnerRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, page, limit, ...filter } =
      findInternationalScientificCongressPartnersByCongressIdSchema.parse({
        ...req.params,
        ...req.query,
      })

    const offset = limit ? limit * page - limit : undefined

    const [partners, totalPartners] = await Promise.all([
      this.internationalScientificCongressPartnerRepository.findByCongressId({
        pagination: {
          offset,
          limit,
        },
        filter: {
          congressId: id,
          ...filter,
        },
      }),
      this.internationalScientificCongressPartnerRepository.count({
        filter: {
          congressId: id,
          name: filter.name,
        },
      }),
    ])

    const totalPages = limit ? Math.max(Math.ceil(totalPartners / limit), 1) : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      partners,
    })
  }
}
