import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IBookVolumeRepository } from '../../repositories/book-volume/ibook-volume-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateBookVolumeSchema = z.object({
  id: z.uuid(),
  volumeNumber: z.coerce.number().int().positive().optional(),
  year: z.coerce.number().int().positive().optional(),
  title: z.string().min(1, 'Título é obrigatório.').optional(),
  authorId: z.string().uuid('ID do autor deve ser um UUID válido.').optional(),
  accessUrl: z.string().url('URL de acesso deve ser válida').optional(),
  catalogSheetUrl: z
    .string()
    .url('URL da ficha catalográfica deve ser válida')
    .optional(),
  description: z.string().optional(),
  coverImage: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_IMAGE_SIZE_BYTES
    }, `A imagem da capa deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`)
    .optional(),
})

export class UpdateBookVolumeController {
  constructor(
    private readonly bookVolumeRepository: IBookVolumeRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      volumeNumber,
      year,
      title,
      authorId,
      accessUrl,
      catalogSheetUrl,
      description,
      coverImage,
    } = updateBookVolumeSchema.parse({
      id: req.params.id,
      ...req.body,
      coverImage: (req.files as { [fieldname: string]: Express.Multer.File[] })
        ?.coverImage?.[0],
    })

    const existingBookVolume = await this.bookVolumeRepository.findById(id)

    if (!existingBookVolume) {
      throw new NotFoundError('O volume de livro não existe.')
    }

    let coverImageUrl = existingBookVolume.coverImageUrl

    if (coverImage) {
      coverImageUrl = await this.firebaseStorageService.uploadFile({
        file: coverImage,
        id,
        folder: PATHS.BOOK_VOLUME_COVER,
      })
    }

    await this.bookVolumeRepository.update({
      id,
      volumeNumber,
      year,
      title,
      authorId,
      accessUrl,
      catalogSheetUrl,
      description,
      coverImageUrl,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
