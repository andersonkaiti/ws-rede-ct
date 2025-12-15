import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInternationalScientificCongressGalleryRepository } from '../../repositories/international-scientific-congress/gallery/iinternational-scientific-congress-gallery-repository.js'

extendZodWithOpenApi(z)

export const deleteInternationalScientificCongressGallerySchema = z.object({
  id: z.uuid(),
})

export class DeleteInternationalScientificCongressGalleryController {
  constructor(
    private readonly internationalScientificCongressGalleryRepository: IInternationalScientificCongressGalleryRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteInternationalScientificCongressGallerySchema.parse({
        id: req.params.id,
      })

      const existingGallery =
        await this.internationalScientificCongressGalleryRepository.findById(id)

      if (!existingGallery) {
        throw new NotFoundError('A imagem da galeria não existe.')
      }

      await this.internationalScientificCongressGalleryRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
