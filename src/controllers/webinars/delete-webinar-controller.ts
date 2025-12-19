import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IWebinarRepository } from '../../repositories/webinar/iwebinar-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteWebinarSchema = z.object({
  id: z.uuid(),
})

export class DeleteWebinarController {
  constructor(
    private readonly webinarRepository: IWebinarRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteWebinarSchema.parse({
      id: req.params.id,
    })

    const existingWebinar = await this.webinarRepository.findById(id)

    if (!existingWebinar) {
      throw new NotFoundError('O webinar não existe.')
    }

    if (existingWebinar.thumbnailUrl) {
      this.firebaseStorageService.deleteFile({
        fileUrl: existingWebinar.thumbnailUrl,
      })
    }

    await this.webinarRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
