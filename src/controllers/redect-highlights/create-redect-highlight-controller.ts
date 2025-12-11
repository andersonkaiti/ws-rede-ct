import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { RedeCTHighlightType } from '@prisma/client'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IRedeCTHighlightRepository } from '../../repositories/redect-highlight/iredect-highlight-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_IMAGE_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createRedeCTHighlightSchema = z.object({
  type: z.enum(RedeCTHighlightType),
  name: z.string().min(1, 'Nome é obrigatório'),
  image: z.any().refine((value) => {
    if (value === undefined || value === null) {
      return false
    }

    if (typeof value !== 'object' || typeof value.size !== 'number') {
      return false
    }

    return value.size <= MAX_IMAGE_SIZE_BYTES
  }, `A imagem deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`),
  description: z.string().optional(),
  honorableMention: z.string().optional(),
  honoredAt: z.coerce.date(),
  meritUrl: z.url('URL do mérito deve ser válida').optional(),
})

export class CreateRedeCTHighlightController {
  constructor(
    private readonly redectHighlightRepository: IRedeCTHighlightRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        type,
        name,
        image,
        description,
        honorableMention,
        honoredAt,
        meritUrl,
      } = createRedeCTHighlightSchema.parse({
        ...req.body,
        image: req.file,
      })

      const highlight = await this.redectHighlightRepository.create({
        type,
        name,
        description,
        honorableMention,
        honoredAt,
        meritUrl,
      })

      const imageUrl = await this.firebaseStorageService.uploadFile({
        file: image,
        id: highlight.id,
        folder: FileType.REDECT_HIGHLIGHT,
      })

      await this.redectHighlightRepository.update({
        id: highlight.id,
        imageUrl,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
