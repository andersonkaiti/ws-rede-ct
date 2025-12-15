import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IRegionalCongressGalleryRepository } from '../../repositories/regional-congress/gallery/iregional-congress-gallery-repository.js'
import type { IRegionalCongressRepository } from '../../repositories/regional-congress/iregional-congress-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createRegionalCongressGallerySchema = z.object({
  caption: z.string().optional(),
  image: z.any().refine((value) => {
    if (value === undefined || value === null) {
      return false
    }

    if (typeof value !== 'object' || typeof value.size !== 'number') {
      return false
    }

    return value.size <= MAX_IMAGE_SIZE_BYTES
  }, `A imagem deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`),
  id: z.uuid(),
})

export class CreateRegionalCongressGalleryController {
  constructor(
    private readonly regionalCongressGalleryRepository: IRegionalCongressGalleryRepository,
    private readonly regionalCongressRepository: IRegionalCongressRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { caption, image, id } = createRegionalCongressGallerySchema.parse({
        ...req.body,
        ...req.params,
        image: req.file,
      })

      const existingCongress =
        await this.regionalCongressRepository.findById(id)

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
        folder: FileType.GALLERY,
      })

      await this.regionalCongressGalleryRepository.update({
        id: galleryItem.id,
        imageUrl,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
