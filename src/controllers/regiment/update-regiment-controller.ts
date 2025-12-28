import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { RegimentStatus } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegimentRepository } from '../../repositories/regiment/iregiment-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validatePdfFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updateRegimentSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório').optional(),
  version: z.string().min(1, 'Versão é obrigatória').optional(),
  publishedAt: z.coerce.date().optional(),
  document: z
    .any()
    .refine((file) =>
      validatePdfFile({
        file,
      }),
    )
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
        folder: PATHS.REGIMENT,
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
