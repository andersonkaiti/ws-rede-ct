import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IInternationalScientificCongressGalleryRepository } from '../../repositories/international-scientific-congress/gallery/iinternational-scientific-congress-gallery-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updateInternationalScientificCongressGallerySchema = z.object({
  id: z.uuid(),
  image: z
    .any()
    .refine((file) =>
      validateImageFile({
        file,
        optional: true,
      }),
    )
    .optional(),
  caption: z.string().optional(),
})

export class UpdateInternationalScientificCongressGalleryController {
  constructor(
    private readonly internationalScientificCongressGalleryRepository: IInternationalScientificCongressGalleryRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, image, caption } =
      updateInternationalScientificCongressGallerySchema.parse({
        id: req.params.id,
        ...req.body,
        image: req.file,
      })

    const existingGallery =
      await this.internationalScientificCongressGalleryRepository.findById(id)

    if (!existingGallery) {
      throw new NotFoundError('A imagem da galeria não existe.')
    }

    let imageUrl = existingGallery.imageUrl

    if (image) {
      imageUrl = await this.firebaseStorageService.uploadFile({
        file: image,
        id,
        folder: PATHS.INTERNATIONAL_SCIENTIFIC_CONGRESS_GALLERY,
      })
    }

    await this.internationalScientificCongressGalleryRepository.update({
      id,
      imageUrl: imageUrl ?? undefined,
      caption: caption || undefined,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
