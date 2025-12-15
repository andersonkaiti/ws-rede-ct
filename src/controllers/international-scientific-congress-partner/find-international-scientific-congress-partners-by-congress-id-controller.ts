import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IInternationalScientificCongressPartnerRepository } from '../../repositories/international-scientific-congress/partner/international-scientific-congress-gallery-repository-partner-repository.js'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

extendZodWithOpenApi(z)

export const findInternationalScientificCongressPartnersByCongressIdSchema =
  z.object({
    id: z.uuid(),
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).optional(),
    name: z.string().optional(),
  })

export class FindInternationalScientificCongressPartnersByCongressIdController {
  constructor(
    private readonly internationalScientificCongressPartnerRepository: IInternationalScientificCongressPartnerRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id, page, limit, ...filter } =
        findInternationalScientificCongressPartnersByCongressIdSchema.parse({
          ...req.params,
          ...req.query,
        })

      if (page !== undefined && limit !== undefined) {
        const actualPage = page || DEFAULT_PAGE
        const actualLimit = limit || DEFAULT_LIMIT
        const offset = actualLimit * actualPage - actualLimit

        const [partners, totalPartners] = await Promise.all([
          this.internationalScientificCongressPartnerRepository.findByCongressId(
            {
              pagination: {
                offset,
                limit: actualLimit,
              },
              filter: {
                congressId: id,
                ...filter,
              },
            },
          ),
          this.internationalScientificCongressPartnerRepository.count({
            filter: {
              congressId: id,
              name: filter.name,
            },
          }),
        ])

        const totalPages = Math.max(Math.ceil(totalPartners / actualLimit), 1)

        return res.status(HttpStatus.OK).json({
          page: actualPage,
          totalPages,
          offset,
          limit: actualLimit,
          partners,
        })
      }

      const allPartners =
        await this.internationalScientificCongressPartnerRepository.findByCongressId(
          {
            filter: {
              congressId: id,
              ...filter,
            },
          },
        )

      return res.status(HttpStatus.OK).json(allPartners)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
