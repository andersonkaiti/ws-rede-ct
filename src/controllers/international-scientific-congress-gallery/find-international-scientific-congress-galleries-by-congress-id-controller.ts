import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IInternationalScientificCongressGalleryRepository } from '../../repositories/international-scientific-congress/gallery/iinternational-scientific-congress-gallery-repository.js'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

extendZodWithOpenApi(z)

export const findInternationalScientificCongressGalleriesByCongressIdSchema =
  z.object({
    congressId: z.uuid(),
    page: z.coerce.number().min(1).default(DEFAULT_PAGE),
    limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
    caption: z.string().optional(),
  })

export class FindInternationalScientificCongressGalleriesByCongressIdController {
  constructor(
    private readonly internationalScientificCongressGalleryRepository: IInternationalScientificCongressGalleryRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { congressId, page, limit, ...filter } =
        findInternationalScientificCongressGalleriesByCongressIdSchema.parse({
          congressId: req.params.congressId,
          ...req.query,
        })

      const offset = limit * page - limit

      const [galleryImages, totalGalleries] = await Promise.all([
        this.internationalScientificCongressGalleryRepository.findByCongressId({
          pagination: {
            offset,
            limit,
          },
          filter: {
            congressId,
            ...filter,
          },
        }),
        this.internationalScientificCongressGalleryRepository.count({
          filter: {
            congressId,
            caption: filter.caption,
          },
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalGalleries / limit), 1)

      return res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        galleryImages,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
