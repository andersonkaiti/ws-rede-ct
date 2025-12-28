import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { PendencyStatus } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { BadRequestError } from '../../errors/bad-request-error.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'
import { validatePdfFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updatePendencySchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(PendencyStatus),
  dueDate: z.coerce.date().optional(),
  document: z
    .any()
    .refine((file) =>
      validatePdfFile({
        file,
        optional: true,
      }),
    )
    .optional(),
})

export class UpdatePendencyController {
  constructor(
    private readonly pendencyRepository: IPendencyRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { document, id, ...rest } = updatePendencySchema.parse({
      ...req.body,
      id: req.params.id,
      document: req.file,
    })

    const pendencyExists = await this.pendencyRepository.findById(id)

    if (!pendencyExists) {
      throw new BadRequestError('A pendência não existe')
    }

    let documentUrl = pendencyExists.documentUrl

    if (document && document.size > 0) {
      documentUrl = await this.firebaseStorageService.updateFile({
        file: document,
        id: pendencyExists.userId,
        folder: PATHS.PENDENCY,
        fileUrl: pendencyExists.documentUrl,
      })
    }

    await this.pendencyRepository.update({
      ...rest,
      id,
      documentUrl,
    })

    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
