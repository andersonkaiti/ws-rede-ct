import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { PendencyStatus } from '@prisma/client'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
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
      'Arquivo do documento é inválido'
    )
    .optional(),
})

export class UpdatePendencyController {
  constructor(
    private readonly pendencyRepository: IPendencyRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = updatePendencySchema.safeParse({
        ...req.body,
        id: req.params.pendency_id,
        document: req.file,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { document, id, ...rest } = parseResult.data

      const pendencyExists = await this.pendencyRepository.findById(id)

      if (!pendencyExists) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'A pendência não existe',
        })
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

      return res.status(HttpStatus.NO_CONTENT).json()
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
        })
      }
    }
  }
}
