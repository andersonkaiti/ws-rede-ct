import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegionalCongressGalleryRepository } from '../../repositories/regional-congress/gallery/iregional-congress-gallery-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updateRegionalCongressGallerySchema = z.object({
  id: z.uuid('ID inválido'),
  caption: z.string().optional(),
  image: z
    .any()
    .refine((file) =>
      validateImageFile({
        file,
        optional: true,
      }),
    )
    .optional(),
})

export class UpdateRegionalCongressGalleryController {
  constructor(
    private readonly regionalCongressGalleryRepository: IRegionalCongressGalleryRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, caption, image } = updateRegionalCongressGallerySchema.parse({
      ...req.params,
      ...req.body,
      image: req.file,
    })

    const existingGallery =
      await this.regionalCongressGalleryRepository.findById(id)

    if (!existingGallery) {
      throw new NotFoundError('Item de galeria não encontrado')
    }

    let imageUrl: string | undefined

    if (image) {
      imageUrl = await this.firebaseStorageService.uploadFile({
        file: image,
        id,
        folder: PATHS.GALLERY,
      })
    }

    await this.regionalCongressGalleryRepository.update({
      id,
      caption,
      ...(imageUrl && { imageUrl }),
    })

    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
