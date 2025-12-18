import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deletePendencySchema = z.object({
  id: z.uuid(),
})

export class DeletePendencyController {
  constructor(
    private readonly pendencyRepository: IPendencyRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deletePendencySchema.parse(req.params)

    const pendency = await this.pendencyRepository.findById(id)

    if (!pendency) {
      throw new NotFoundError('A pendência não existe.')
    }

    await Promise.all([
      this.pendencyRepository.deleteById(pendency.id),
      this.firebaseStorageService.deleteFile({
        fileUrl: pendency.documentUrl,
      }),
    ])

    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
