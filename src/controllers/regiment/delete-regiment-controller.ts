import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegimentRepository } from '../../repositories/regiment/iregiment-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteRegimentSchema = z.object({
  id: z.uuid(),
})

export class DeleteRegimentController {
  constructor(
    private readonly regimentRepository: IRegimentRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteRegimentSchema.parse({
        id: req.params.id,
      })

      const existingRegiment = await this.regimentRepository.findById(id)

      if (!existingRegiment) {
        throw new NotFoundError('O regimento não existe.')
      }

      if (existingRegiment.documentUrl) {
        await this.firebaseStorageService.deleteFile({
          fileUrl: existingRegiment.documentUrl,
        })
      }

      await this.regimentRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
