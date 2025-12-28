import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IBookVolumeRepository } from '../../repositories/book-volume/ibook-volume-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updateBookVolumeSchema = z.object({
  id: z.uuid(),
  volumeNumber: z.coerce.number().int().positive().optional(),
  year: z.coerce.number().int().positive().optional(),
  title: z.string().min(1, 'Título é obrigatório.').optional(),
  authorId: z.uuid('ID do autor deve ser um UUID válido.').optional(),
  accessUrl: z.url('URL de acesso deve ser válida').optional(),
  catalogSheetUrl: z
    .url('URL da ficha catalográfica deve ser válida')
    .optional(),
  description: z.string().optional(),
  coverImage: z
    .any()
    .refine((value) =>
      validateImageFile({
        file: value,
        optional: true,
      }),
    )
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
