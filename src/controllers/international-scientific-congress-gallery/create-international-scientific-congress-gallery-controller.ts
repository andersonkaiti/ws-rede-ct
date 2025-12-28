import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IInternationalScientificCongressGalleryRepository } from '../../repositories/international-scientific-congress/gallery/iinternational-scientific-congress-gallery-repository.js'
import type { IInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/iinternational-scientific-congress-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const createInternationalScientificCongressGallerySchema = z.object({
  image: z.any().refine((file) =>
    validateImageFile({
      file,
    }),
  ),
  caption: z.string().optional(),
  id: z.uuid(),
})

export class CreateInternationalScientificCongressGalleryController {
  constructor(
    private readonly internationalScientificCongressGalleryRepository: IInternationalScientificCongressGalleryRepository,
    private readonly internationalScientificCongressRepository: IInternationalScientificCongressRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { image, caption, id } =
      createInternationalScientificCongressGallerySchema.parse({
        ...req.body,
        ...req.params,
        image: req.file,
      })

    const existingCongress =
      await this.internationalScientificCongressRepository.findById(id)

    if (!existingCongress) {
      throw new NotFoundError('O congresso não existe.')
    }

    const gallery =
      await this.internationalScientificCongressGalleryRepository.create({
        imageUrl: '',
        caption: caption || undefined,
        congressId: id,
      })

    const imageUrl = await this.firebaseStorageService.uploadFile({
      file: image,
      id: gallery.id,
      folder: PATHS.INTERNATIONAL_SCIENTIFIC_CONGRESS_GALLERY,
    })

    await this.internationalScientificCongressGalleryRepository.update({
      id: gallery.id,
      imageUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
