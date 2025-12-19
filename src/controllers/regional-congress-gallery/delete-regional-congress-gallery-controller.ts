import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegionalCongressGalleryRepository } from '../../repositories/regional-congress/gallery/iregional-congress-gallery-repository.js'

extendZodWithOpenApi(z)

export const deleteRegionalCongressGallerySchema = z.object({
  id: z.uuid('ID inválido'),
})

export class DeleteRegionalCongressGalleryController {
  constructor(
    private readonly regionalCongressGalleryRepository: IRegionalCongressGalleryRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteRegionalCongressGallerySchema.parse(req.params)

    const gallery = await this.regionalCongressGalleryRepository.findById(id)

    if (!gallery) {
      throw new NotFoundError('Item de galeria não encontrado')
    }

    await this.regionalCongressGalleryRepository.deleteById(id)

    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
