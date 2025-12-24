import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IInternationalScientificCongressGalleryRepository } from '../../repositories/international-scientific-congress/gallery/iinternational-scientific-congress-gallery-repository.js'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findInternationalScientificCongressGalleriesByCongressIdSchema =
  z.object({
    id: z.uuid(),
    page: z.coerce.number().min(1).default(DEFAULT_PAGE),
    limit: z.coerce.number().optional(),
    caption: z.string().optional(),
  })

export class FindInternationalScientificCongressGalleriesByCongressIdController {
  constructor(
    private readonly internationalScientificCongressGalleryRepository: IInternationalScientificCongressGalleryRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, page, limit, ...filter } =
      findInternationalScientificCongressGalleriesByCongressIdSchema.parse({
        id: req.params.id,
        ...req.query,
      })

    const offset = limit ? limit * page - limit : undefined

    const [galleryImages, totalGalleries] = await Promise.all([
      this.internationalScientificCongressGalleryRepository.findByCongressId({
        pagination: {
          offset,
          limit,
        },
        filter: {
          congressId: id,
          ...filter,
        },
      }),
      this.internationalScientificCongressGalleryRepository.count({
        filter: {
          congressId: id,
          caption: filter.caption,
        },
      }),
    ])

    const totalPages = limit
      ? Math.max(Math.ceil(totalGalleries / limit), 1)
      : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      galleryImages,
    })
  }
}
