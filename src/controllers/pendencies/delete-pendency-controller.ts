import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deletePendencySchema = z.object({
  id: z.uuid(),
})

export class DeletePendencyController {
  constructor(
    private readonly pendencyRepository: IPendencyRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = deletePendencySchema.safeParse({
        id: req.params.pendency_id,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const pendency = await this.pendencyRepository.findById(
        parseResult.data.id
      )

      if (!pendency) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'A pendência não existe.',
        })
      }

      await Promise.all([
        this.pendencyRepository.deleteById(pendency.id),
        this.firebaseStorageService.deleteFile({
          fileUrl: pendency.documentUrl,
        }),
      ])

      return res.status(HttpStatus.NO_CONTENT).json()
    } catch (err) {
      if (err instanceof Error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
        })
      }
    }
  }
}
