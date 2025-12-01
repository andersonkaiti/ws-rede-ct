import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IPostGraduateProgramRepository } from '../../repositories/post-graduate-program/ipost-graduate-program-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deletePostGraduateProgramSchema = z.object({
  id: z.uuid(),
})

export class DeletePostGraduateProgramController {
  constructor(
    private readonly postGraduateProgramRepository: IPostGraduateProgramRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deletePostGraduateProgramSchema.parse({
        id: req.params.id,
      })

      const existingPostGraduateProgram =
        await this.postGraduateProgramRepository.findById(id)

      if (!existingPostGraduateProgram) {
        throw new NotFoundError('O programa de pós-graduação não existe.')
      }

      if (existingPostGraduateProgram.imageUrl) {
        this.firebaseStorageService.deleteFile({
          fileUrl: existingPostGraduateProgram.imageUrl,
        })
      }

      await this.postGraduateProgramRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
