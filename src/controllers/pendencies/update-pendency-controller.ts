import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { PendencyStatus } from '../../../config/database/generated/enums.ts'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { BadRequestError } from '../../errrors/bad-request-error.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const updatePendencySchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(PendencyStatus),
  dueDate: z.coerce.date().optional(),
  document: z
    .any()
    .refine(
      (file) =>
        file == null ||
        (typeof file === 'object' &&
          typeof file.size === 'number' &&
          (file.size === 0 || file.size > 0)),
      'Arquivo do documento é inválido',
    )
    .optional(),
})

export class UpdatePendencyController {
  constructor(
    private readonly pendencyRepository: IPendencyRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { document, id, ...rest } = updatePendencySchema.parse({
        ...req.body,
        id: req.params.pendency_id,
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
          folder: FileType.PENDENCY,
          fileUrl: pendencyExists.documentUrl,
        })
      }

      await this.pendencyRepository.update({
        ...rest,
        id,
        documentUrl,
      })

      return res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
