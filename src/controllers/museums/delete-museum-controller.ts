import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IMuseumRepository } from '../../repositories/museum/imuseum-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteMuseumSchema = z.object({
  id: z.uuid(),
})

export class DeleteMuseumController {
  constructor(
    private readonly museumRepository: IMuseumRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteMuseumSchema.parse({
      id: req.params.id,
    })

    const existingMuseum = await this.museumRepository.findById(id)

    if (!existingMuseum) {
      throw new NotFoundError('O museu não existe.')
    }

    if (existingMuseum.logoUrl) {
      this.firebaseStorageService.deleteFile({
        fileUrl: existingMuseum.logoUrl,
      })
    }

    await this.museumRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
