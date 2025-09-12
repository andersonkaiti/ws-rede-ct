import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const registerCertificationSchema = z.object({
  userId: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório.'),
  description: z.string().min(1, 'Descrição é obrigatória.'),
  certification: z
    .any()
    .refine(
      (file) => file && typeof file === 'object' && file.size > 0,
      'Arquivo do certificado é obrigatório'
    ),
})

export class RegisterCertificationController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly certificationRepository: ICertificationRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = registerCertificationSchema.safeParse({
        ...req.body,
        userId: req.params.user_id,
        certification: req.file,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { userId, title, description, certification } = parseResult.data

      const user = await this.userRepository.findById(userId)

      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'O usuário não existe.',
        })
      }

      const certificationUrl = await this.firebaseStorageService.uploadFile({
        file: certification,
        id: userId,
        folder: FileType.CERTIFICATION,
      })

      await this.certificationRepository.register({
        userId,
        title,
        description,
        certificationUrl,
      })

      return res.status(HttpStatus.CREATED).json()
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
