import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { RegimentStatus } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import type { IRegimentRepository } from '../../repositories/regiment/iregiment-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_DOCUMENT_SIZE_MB = 10
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_DOCUMENT_SIZE_BYTES = MAX_DOCUMENT_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createRegimentSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  version: z.string().min(1, 'Versão é obrigatória'),
  publishedAt: z.coerce.date(),
  document: z.any().refine((value) => {
    if (value === undefined || value === null) {
      return false
    }

    if (typeof value !== 'object' || typeof value.size !== 'number') {
      return false
    }

    return value.size <= MAX_DOCUMENT_SIZE_BYTES
  }, `O documento deve ter no máximo ${MAX_DOCUMENT_SIZE_MB}MB.`),
  status: z.enum(RegimentStatus).optional(),
})

export class CreateRegimentController {
  constructor(
    private readonly regimentRepository: IRegimentRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { title, version, publishedAt, document, status } =
      createRegimentSchema.parse({
        ...req.body,
        document: req.file,
      })

    const regiment = await this.regimentRepository.create({
      title,
      version,
      publishedAt,
      documentUrl: '',
      status: status ?? RegimentStatus.IN_FORCE,
    })

    const documentUrl = await this.firebaseStorageService.uploadFile({
      file: document,
      id: regiment.id,
      folder: PATHS.REGIMENT,
    })

    await this.regimentRepository.update({
      id: regiment.id,
      documentUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
