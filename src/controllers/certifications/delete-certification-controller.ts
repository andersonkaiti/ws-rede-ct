import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const deleteCertificationSchema = z.object({
  id: z.string(),
})

export class DeleteCertificationController {
  constructor(
    private readonly certificationRepository: ICertificationRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = deleteCertificationSchema.safeParse({
        id: req.params.certification_id,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: z.prettifyError(parseResult.error),
        })
      }

      const certification = await this.certificationRepository.findById(
        parseResult.data.id
      )

      if (!certification) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'A certificação não existe.',
        })
      }

      await Promise.all([
        this.certificationRepository.deleteById(certification.id),

        this.firebaseStorageService.deleteFile({
          fileUrl: certification.certificationUrl,
        }),
      ])

      return res.status(HttpStatus.OK).json({
        message: 'Certificação deletada com sucesso!',
      })
    } catch (err) {
      if (err instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: err.message,
        })
      }
    }
  }
}
