import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IBookVolumeRepository } from '../../repositories/book-volume/ibook-volume-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteBookVolumeSchema = z.object({
  id: z.uuid(),
})

export class DeleteBookVolumeController {
  constructor(
    private readonly bookVolumeRepository: IBookVolumeRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteBookVolumeSchema.parse({
        id: req.params.id,
      })

      const existingBookVolume = await this.bookVolumeRepository.findById(id)

      if (!existingBookVolume) {
        throw new NotFoundError('O volume de livro não existe.')
      }

      if (existingBookVolume.authorImageUrl) {
        this.firebaseStorageService.deleteFile({
          fileUrl: existingBookVolume.authorImageUrl,
        })
      }

      if (existingBookVolume.coverImageUrl) {
        this.firebaseStorageService.deleteFile({
          fileUrl: existingBookVolume.coverImageUrl,
        })
      }

      if (existingBookVolume.catalogSheetUrl) {
        this.firebaseStorageService.deleteFile({
          fileUrl: existingBookVolume.catalogSheetUrl,
        })
      }

      await this.bookVolumeRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
