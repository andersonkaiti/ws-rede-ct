import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRedeCTHighlightRepository } from '../../repositories/redect-highlight/iredect-highlight-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_IMAGE_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateRedeCTHighlightSchema = z.object({
  id: z.uuid(),
  type: z.enum(['PERSON', 'INSTITUTION']).optional(),
  name: z.string().min(1, 'Nome é obrigatório').optional(),
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
  description: z.string().optional(),
  honorableMention: z.string().optional(),
  honoredAt: z.coerce.date().optional(),
  meritUrl: z.url('URL do mérito deve ser válida').optional(),
})

export class UpdateRedeCTHighlightController {
  constructor(
    private readonly redectHighlightRepository: IRedeCTHighlightRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id,
        type,
        name,
        image,
        description,
        honorableMention,
        honoredAt,
        meritUrl,
      } = updateRedeCTHighlightSchema.parse({
        id: req.params.id,
        ...req.body,
        image: req.file,
      })

      const existingHighlight =
        await this.redectHighlightRepository.findById(id)

      if (!existingHighlight) {
        throw new NotFoundError('O destaque não existe.')
      }

      let imageUrl = existingHighlight.imageUrl

      if (image) {
        imageUrl = await this.firebaseStorageService.uploadFile({
          file: image,
          id,
          folder: 'images/redect-highlights',
        })
      }

      if (!imageUrl) {
        throw new InternalServerError('URL da imagem é obrigatória')
      }

      await this.redectHighlightRepository.update({
        id,
        type,
        name,
        imageUrl,
        description,
        honorableMention,
        honoredAt,
        meritUrl,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
