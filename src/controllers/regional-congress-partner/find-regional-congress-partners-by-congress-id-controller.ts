import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegionalCongressPartnerRepository } from '../../repositories/regional-congress/partner/iregional-congress-partner-repository.js'

extendZodWithOpenApi(z)

export const findRegionalCongressPartnersByCongressIdSchema = z.object({
  id: z.uuid('ID do congresso inválido'),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  name: z.string().optional(),
})

export class FindRegionalCongressPartnersByCongressIdController {
  constructor(
    private readonly regionalCongressPartnerRepository: IRegionalCongressPartnerRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id, page, limit, name } =
        findRegionalCongressPartnersByCongressIdSchema.parse({
          ...req.params,
          ...req.query,
        })

      const hasPagination = page !== undefined && limit !== undefined

      const pagination = hasPagination
        ? {
            offset: ((page as number) - 1) * (limit as number),
            limit: limit as number,
          }
        : undefined

      const partners =
        await this.regionalCongressPartnerRepository.findByCongressId({
          pagination,
          filter: {
            congressId: id,
            name,
          },
        })

      if (!partners) {
        throw new NotFoundError('Parceiros não encontrados')
      }

      if (!hasPagination) {
        return res.status(HttpStatus.OK).json(partners)
      }

      const total = await this.regionalCongressPartnerRepository.count({
        filter: {
          congressId: id,
          name,
        },
      })

      return res.status(HttpStatus.OK).json({
        data: partners,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / (limit as number)),
        },
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
