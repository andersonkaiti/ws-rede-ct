import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInMemoriamRepository } from '../../repositories/in-memoriam/iin-memoriam-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteInMemoriamSchema = z.object({
  id: z.uuid(),
})

export class DeleteInMemoriamController {
  constructor(
    private readonly inMemoriamRepository: IInMemoriamRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteInMemoriamSchema.parse({
        id: req.params.id,
      })

      const existingInMemoriam = await this.inMemoriamRepository.findById(id)

      if (!existingInMemoriam) {
        throw new NotFoundError('O in memoriam não existe.')
      }

      if (existingInMemoriam.photoUrl) {
        this.firebaseStorageService.deleteFile({
          fileUrl: existingInMemoriam.photoUrl,
        })
      }

      await this.inMemoriamRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
