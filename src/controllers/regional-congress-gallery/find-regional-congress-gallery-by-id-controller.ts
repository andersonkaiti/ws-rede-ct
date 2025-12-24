import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegionalCongressGalleryRepository } from '../../repositories/regional-congress/gallery/iregional-congress-gallery-repository.js'

extendZodWithOpenApi(z)

export const findRegionalCongressGalleryByIdSchema = z.object({
  id: z.uuid('ID inválido'),
})

export class FindRegionalCongressGalleryByIdController {
  constructor(
    private readonly regionalCongressGalleryRepository: IRegionalCongressGalleryRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = findRegionalCongressGalleryByIdSchema.parse(req.params)

    const gallery = await this.regionalCongressGalleryRepository.findById(id)

    if (!gallery) {
      throw new NotFoundError('Item de galeria não encontrado')
    }

    return res.status(HttpStatus.OK).json(gallery)
  }
}
