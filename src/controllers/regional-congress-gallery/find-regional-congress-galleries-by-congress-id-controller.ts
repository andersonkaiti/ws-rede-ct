import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IRegionalCongressGalleryRepository } from '../../repositories/regional-congress/gallery/iregional-congress-gallery-repository.js'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findRegionalCongressGalleriesByCongressIdSchema = z.object({
  id: z.uuid(),
  page: z.coerce.number().default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  caption: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
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

    const offset = limit ? limit * page - limit : undefined

    const [galleryImages, total] = await Promise.all([
      this.regionalCongressGalleryRepository.findByCongressId({
        pagination: {
          offset,
          limit,
        },
        filter: {
          caption,
          congressId: id,
        },
      }),

      this.regionalCongressGalleryRepository.count({
        filter: {
          caption,
          congressId: id,
        },
      }),
    ])

    const totalPages = limit ? Math.ceil(total / limit) : 1

    return res.status(HttpStatus.OK).json({
      page,
      limit,
      total,
      totalPages,
      galleryImages,
    })
  }
}
