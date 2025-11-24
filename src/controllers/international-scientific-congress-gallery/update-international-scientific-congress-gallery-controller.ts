import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInternationalScientificCongressGalleryRepository } from '../../repositories/international-scientific-congress/gallery/iinternational-scientific-congress-gallery-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_IMAGE_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateInternationalScientificCongressGallerySchema = z.object({
  id: z.uuid(),
  image: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_IMAGE_SIZE_BYTES
    }, `A imagem deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`)
    .optional(),
  caption: z.string().optional(),
})

export class UpdateInternationalScientificCongressGalleryController {
  constructor(
    private readonly internationalScientificCongressGalleryRepository: IInternationalScientificCongressGalleryRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
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
          folder: FileType.INTERNATIONAL_SCIENTIFIC_CONGRESS_GALLERY,
        })
      }

      await this.internationalScientificCongressGalleryRepository.update({
        id,
        imageUrl: imageUrl ?? undefined,
        caption: caption || undefined,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
