import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IRegionalCongressPartnerRepository } from '../../repositories/regional-congress/partner/iregional-congress-partner-repository.js'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findRegionalCongressPartnersByCongressIdSchema = z.object({
  id: z.uuid('ID do congresso inválido'),
  page: z.coerce.number().default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  name: z.string().optional(),
})

export class FindRegionalCongressPartnersByCongressIdController {
  constructor(
    private readonly regionalCongressPartnerRepository: IRegionalCongressPartnerRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, page, limit, name } =
      findRegionalCongressPartnersByCongressIdSchema.parse({
        ...req.params,
        ...req.query,
      })

    const offset = limit ? limit * page - limit : undefined

    const [partners, total] = await Promise.all([
      this.regionalCongressPartnerRepository.findByCongressId({
        pagination: {
          offset,
          limit,
        },
        filter: {
          congressId: id,
          name,
        },
      }),

      this.regionalCongressPartnerRepository.count({
        filter: {
          congressId: id,
          name,
        },
      }),
    ])

    const totalPages = limit ? Math.ceil(total / (limit as number)) : 1

    return res.status(HttpStatus.OK).json({
      page,
      limit,
      total,
      totalPages,
      partners,
    })
  }
}
