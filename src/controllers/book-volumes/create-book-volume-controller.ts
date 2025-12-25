import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import type { IBookVolumeRepository } from '../../repositories/book-volume/ibook-volume-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createBookVolumeSchema = z.object({
  volumeNumber: z.coerce
    .number()
    .int()
    .positive('Número do volume é obrigatório.'),
  year: z.coerce.number().int().positive('Ano é obrigatório.'),
  title: z.string().min(1, 'Título é obrigatório.'),
  authorId: z.uuid('ID do autor deve ser um UUID válido.'),
  accessUrl: z.url().optional(),
  catalogSheetUrl: z.url().optional(),
  description: z.string().optional(),
  coverImage: z
    .any()
    .refine(
      (file) =>
        !file ||
        (typeof file === 'object' &&
          typeof file.mimetype === 'string' &&
          file.mimetype.startsWith('image/') &&
          typeof file.size === 'number' &&
          file.size <= MAX_IMAGE_SIZE_BYTES),
      'A imagem da capa deve ser uma imagem válida de no máximo 5MB.',
    ),
})

export class CreateBookVolumeController {
  constructor(
    private readonly bookVolumeRepository: IBookVolumeRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      volumeNumber,
      year,
      title,
      authorId,
      accessUrl,
      catalogSheetUrl,
      description,
      coverImage,
    } = createBookVolumeSchema.parse({
      ...req.body,
      coverImage: (req.files as { [fieldname: string]: Express.Multer.File[] })
        ?.coverImage?.[0],
    })

    const bookVolume = await this.bookVolumeRepository.create({
      volumeNumber,
      year,
      title,
      authorId,
      accessUrl,
      catalogSheetUrl,
      description,
    })

    let coverImageUrl = bookVolume.coverImageUrl

    coverImageUrl = await this.firebaseStorageService.uploadFile({
      file: coverImage,
      folder: PATHS.BOOK_VOLUME_COVER,
      id: bookVolume.id,
    })

    await this.bookVolumeRepository.update({
      id: bookVolume.id,
      coverImageUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
