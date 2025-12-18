import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegionalCongressGalleryRepository } from '../../repositories/regional-congress/gallery/iregional-congress-gallery-repository.js'

extendZodWithOpenApi(z)

export const findRegionalCongressGalleriesByCongressIdSchema = z.object({
  id: z.uuid('ID do congresso inválido'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  caption: z.string().optional(),
})

export class FindRegionalCongressGalleriesByCongressIdController {
  constructor(
    private readonly regionalCongressGalleryRepository: IRegionalCongressGalleryRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { page, limit, caption, id } =
      findRegionalCongressGalleriesByCongressIdSchema.parse({
        ...req.params,
        ...req.query,
      })

    const offset = (page - 1) * limit

    const galleries =
      await this.regionalCongressGalleryRepository.findByCongressId({
        pagination: {
          offset,
          limit,
        },
        filter: {
          caption,
          congressId: id,
        },
      })

    if (!galleries) {
      throw new NotFoundError('Itens de galeria não encontrados')
    }

    const total = await this.regionalCongressGalleryRepository.count({
      filter: {
        caption,
        congressId: id,
      },
    })

    return res.status(HttpStatus.OK).json({
      data: galleries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  }
}
