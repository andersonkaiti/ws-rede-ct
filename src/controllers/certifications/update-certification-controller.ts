import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { BadRequestError } from '../../errors/bad-request-error.ts'
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
      'Arquivo do certificado é inválido',
    )
    .optional(),
})

export class UpdateCertificationController {
  constructor(
    private readonly certificationRepository: ICertificationRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { certification, id, ...rest } = updateCertificationSchema.parse({
      ...req.body,
      id: req.params.id,
      certification: req.file,
    })

    const certificationExists = await this.certificationRepository.findById(id)

    if (!certificationExists) {
      throw new BadRequestError('A certificação não existe')
    }

    let certificationUrl = certificationExists.certificationUrl

    if (certification && certification.size > 0) {
      certificationUrl = await this.firebaseStorageService.updateFile({
        file: certification,
        id: certificationExists.userId,
        folder: PATHS.CERTIFICATION,
        fileUrl: certificationExists.certificationUrl,
      })
    }

    await this.certificationRepository.update({
      ...rest,
      id,
      certificationUrl,
    })

    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
