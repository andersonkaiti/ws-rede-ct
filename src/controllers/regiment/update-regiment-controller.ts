import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { RegimentStatus } from '../../../config/database/generated/enums.ts'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegimentRepository } from '../../repositories/regiment/iregiment-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_DOCUMENT_SIZE_MB = 10
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_DOCUMENT_SIZE_BYTES = MAX_DOCUMENT_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateRegimentSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório').optional(),
  version: z.string().min(1, 'Versão é obrigatória').optional(),
  publishedAt: z.coerce.date().optional(),
  document: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_DOCUMENT_SIZE_BYTES
    }, `O documento deve ter no máximo ${MAX_DOCUMENT_SIZE_MB}MB.`)
    .optional(),
  status: z.enum(RegimentStatus).optional(),
})

export class UpdateRegimentController {
  constructor(
    private readonly regimentRepository: IRegimentRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, title, version, publishedAt, document, status } =
      updateRegimentSchema.parse({
        id: req.params.id,
        ...req.body,
        document: req.file,
      })

    const existingRegiment = await this.regimentRepository.findById(id)

    if (!existingRegiment) {
      throw new NotFoundError('O regimento não existe.')
    }

    let documentUrl = existingRegiment.documentUrl

    if (document) {
      if (existingRegiment.documentUrl) {
        await this.firebaseStorageService.deleteFile({
          fileUrl: existingRegiment.documentUrl,
        })
      }

      documentUrl = await this.firebaseStorageService.uploadFile({
        file: document,
        id,
        folder: FileType.REGIMENT,
      })
    }

    await this.regimentRepository.update({
      id,
      title,
      version,
      publishedAt,
      documentUrl: documentUrl ?? undefined,
      status,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
