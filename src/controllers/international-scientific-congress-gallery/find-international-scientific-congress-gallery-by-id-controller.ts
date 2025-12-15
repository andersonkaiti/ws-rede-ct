import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInternationalScientificCongressGalleryRepository } from '../../repositories/international-scientific-congress/gallery/iinternational-scientific-congress-gallery-repository.js'

extendZodWithOpenApi(z)

export const findInternationalScientificCongressGalleryByIdSchema = z.object({
  id: z.uuid(),
})

export class FindInternationalScientificCongressGalleryByIdController {
  constructor(
    private readonly internationalScientificCongressGalleryRepository: IInternationalScientificCongressGalleryRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findInternationalScientificCongressGalleryByIdSchema.parse(
        {
          id: req.params.id,
        },
      )

      const gallery =
        await this.internationalScientificCongressGalleryRepository.findById(id)

      if (!gallery) {
        throw new NotFoundError('A imagem da galeria não existe.')
      }

      return res.status(HttpStatus.OK).json(gallery)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
