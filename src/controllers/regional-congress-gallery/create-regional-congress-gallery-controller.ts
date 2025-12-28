import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegionalCongressGalleryRepository } from '../../repositories/regional-congress/gallery/iregional-congress-gallery-repository.js'
import type { IRegionalCongressRepository } from '../../repositories/regional-congress/iregional-congress-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const createRegionalCongressGallerySchema = z.object({
  caption: z.string().optional(),
  image: z.any().refine((file) =>
    validateImageFile({
      file,
    }),
  ),
  id: z.uuid(),
})

export class CreateRegionalCongressGalleryController {
  constructor(
    private readonly regionalCongressGalleryRepository: IRegionalCongressGalleryRepository,
    private readonly regionalCongressRepository: IRegionalCongressRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { caption, image, id } = createRegionalCongressGallerySchema.parse({
      ...req.body,
      ...req.params,
      image: req.file,
    })

    const existingCongress = await this.regionalCongressRepository.findById(id)

    if (!existingCongress) {
      throw new NotFoundError('O congresso não existe.')
    }

    const galleryItem = await this.regionalCongressGalleryRepository.create({
      caption,
      congressId: id,
      imageUrl: '',
    })

    const imageUrl = await this.firebaseStorageService.uploadFile({
      file: image,
      id: galleryItem.id,
      folder: PATHS.GALLERY,
    })

    await this.regionalCongressGalleryRepository.update({
      id: galleryItem.id,
      imageUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
