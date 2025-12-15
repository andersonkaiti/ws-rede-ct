import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

extendZodWithOpenApi(z)

export const deleteCertificationSchema = z.object({
  id: z.string(),
})

export class DeleteCertificationController {
  constructor(
    private readonly certificationRepository: ICertificationRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteCertificationSchema.parse({
        id: req.params.certification_id,
      })

      const certification = await this.certificationRepository.findById(id)

      if (!certification) {
        throw new NotFoundError('A certificação não existe.')
      }

      await Promise.all([
        this.certificationRepository.deleteById(certification.id),

        this.firebaseStorageService.deleteFile({
          fileUrl: certification.certificationUrl,
        }),
      ])

      return res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
