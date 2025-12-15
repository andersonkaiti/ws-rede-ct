import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IRegionalCongressGalleryRepository } from '../../repositories/regional-congress/gallery/iregional-congress-gallery-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateRegionalCongressGallerySchema = z.object({
  id: z.string().uuid('ID inválido'),
  caption: z.string().optional(),
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
})

export class UpdateRegionalCongressGalleryController {
  constructor(
    private readonly regionalCongressGalleryRepository: IRegionalCongressGalleryRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
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
          folder: FileType.GALLERY,
        })
      }

      await this.regionalCongressGalleryRepository.update({
        id,
        caption,
        ...(imageUrl && { imageUrl }),
      })

      return res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
