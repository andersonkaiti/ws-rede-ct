import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
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
  author: z.string().min(1, 'Autor é obrigatório.').optional(),
  accessUrl: z.string().url('URL de acesso deve ser válida').optional(),
  description: z.string().optional(),
  authorImage: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_IMAGE_SIZE_BYTES
    }, `A imagem do autor deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`)
    .optional(),
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
  catalogSheet: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_IMAGE_SIZE_BYTES
    }, `A ficha catalográfica deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`)
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
      author,
      accessUrl,
      description,
      authorImage,
      coverImage,
      catalogSheet,
    } = updateBookVolumeSchema.parse({
      id: req.params.id,
      ...req.body,
      authorImage: (req.files as { [fieldname: string]: Express.Multer.File[] })
        ?.authorImage?.[0],
      coverImage: (req.files as { [fieldname: string]: Express.Multer.File[] })
        ?.coverImage?.[0],
      catalogSheet: (
        req.files as { [fieldname: string]: Express.Multer.File[] }
      )?.catalogSheet?.[0],
    })

    const existingBookVolume = await this.bookVolumeRepository.findById(id)

    if (!existingBookVolume) {
      throw new NotFoundError('O volume de livro não existe.')
    }

    let authorImageUrl = existingBookVolume.authorImageUrl
    let coverImageUrl = existingBookVolume.coverImageUrl
    let catalogSheetUrl = existingBookVolume.catalogSheetUrl

    if (authorImage) {
      authorImageUrl = await this.firebaseStorageService.uploadFile({
        file: authorImage,
        id,
        folder: File.BOOK_VOLUME_AUTHOR_IMAGE,
      })
    }

    if (coverImage) {
      coverImageUrl = await this.firebaseStorageService.uploadFile({
        file: coverImage,
        id,
        folder: File.BOOK_VOLUME_COVER,
      })
    }

    if (catalogSheet) {
      catalogSheetUrl = await this.firebaseStorageService.uploadFile({
        file: catalogSheet,
        id,
        folder: File.BOOK_VOLUME_CATALOG_SHEET,
      })
    }

    await this.bookVolumeRepository.update({
      id,
      volumeNumber,
      year,
      title,
      author,
      accessUrl,
      description,
      authorImageUrl,
      coverImageUrl,
      catalogSheetUrl,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
