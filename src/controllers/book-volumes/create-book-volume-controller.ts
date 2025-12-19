import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
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
  author: z.string().min(1, 'Autor é obrigatório.'),
  accessUrl: z.url().optional(),
  description: z.string().optional(),
  authorImage: z
    .any()
    .refine(
      (file) =>
        !file ||
        (typeof file === 'object' &&
          typeof file.mimetype === 'string' &&
          file.mimetype.startsWith('image/') &&
          typeof file.size === 'number' &&
          file.size <= MAX_IMAGE_SIZE_BYTES),
      'A imagem do autor deve ser uma imagem válida de no máximo 5MB.',
    ),
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
  catalogSheet: z
    .any()
    .refine(
      (file) =>
        !file ||
        (typeof file === 'object' &&
          typeof file.mimetype === 'string' &&
          typeof file.size === 'number' &&
          file.size <= MAX_IMAGE_SIZE_BYTES),
      'A ficha catalográfica deve ter no máximo 5MB.',
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
      author,
      accessUrl,
      description,
      authorImage,
      coverImage,
      catalogSheet,
    } = createBookVolumeSchema.parse({
      ...req.body,
      authorImage: (req.files as { [fieldname: string]: Express.Multer.File[] })
        ?.authorImage?.[0],
      coverImage: (req.files as { [fieldname: string]: Express.Multer.File[] })
        ?.coverImage?.[0],
      catalogSheet: (
        req.files as { [fieldname: string]: Express.Multer.File[] }
      )?.catalogSheet?.[0],
    })

    const bookVolume = await this.bookVolumeRepository.create({
      volumeNumber,
      year,
      title,
      author,
      accessUrl,
      description,
    })

    let authorImageUrl = bookVolume.authorImageUrl
    let coverImageUrl = bookVolume.coverImageUrl
    let catalogSheetUrl = bookVolume.catalogSheetUrl

    authorImageUrl = await this.firebaseStorageService.uploadFile({
      file: authorImage,
      folder: File.BOOK_VOLUME_AUTHOR_IMAGE,
      id: bookVolume.id,
    })

    coverImageUrl = await this.firebaseStorageService.uploadFile({
      file: coverImage,
      folder: File.BOOK_VOLUME_COVER,
      id: bookVolume.id,
    })

    catalogSheetUrl = await this.firebaseStorageService.uploadFile({
      file: catalogSheet,
      folder: File.BOOK_VOLUME_CATALOG_SHEET,
      id: bookVolume.id,
    })

    await this.bookVolumeRepository.update({
      id: bookVolume.id,
      authorImageUrl,
      coverImageUrl,
      catalogSheetUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
