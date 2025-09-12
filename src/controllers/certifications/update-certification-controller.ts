import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const updateCertificationSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório.'),
  description: z.string().min(1, 'Descrição é obrigatória.'),
  certification: z
    .any()
    .refine(
      (file) =>
        file == null ||
        (typeof file === 'object' &&
          typeof file.size === 'number' &&
          (file.size === 0 || file.size > 0)),
      'Arquivo do certificado é inválido'
    )
    .optional(),
})

export class UpdateCertificationController {
  constructor(
    private readonly certificationRepository: ICertificationRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = updateCertificationSchema.safeParse({
        ...req.body,
        id: req.params.certification_id,
        certification: req.file,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { certification, id, ...rest } = parseResult.data

      const certificationExists =
        await this.certificationRepository.findById(id)

      if (!certificationExists) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'A certificação não existe',
        })
      }

      let certificationUrl = certificationExists.certificationUrl

      if (certification && certification.size > 0) {
        certificationUrl = await this.firebaseStorageService.updateFile({
          file: certification,
          id: certificationExists.userId,
          folder: FileType.CERTIFICATION,
          fileUrl: certificationExists.certificationUrl,
        })
      }

      await this.certificationRepository.update({
        ...rest,
        id,
        certificationUrl,
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
