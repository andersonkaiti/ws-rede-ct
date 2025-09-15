import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { PendencyStatus } from '@prisma/client'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const createPendencySchema = z.object({
  userId: z.uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(PendencyStatus).default('PENDING'),
  dueDate: z.coerce.date().optional(),
  document: z
    .any()
    .refine(
      (file) => file && typeof file === 'object' && file.size > 0,
      'Arquivo do documento é obrigatório'
    ),
})

export class CreatePendencyController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly pendencyRepository: IPendencyRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = createPendencySchema.safeParse({
        ...req.body,
        userId: req.params.user_id,
        document: req.file,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { userId, title, description, status, dueDate, document } =
        parseResult.data

      const user = await this.userRepository.findById(userId)

      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'O usuário não existe.',
        })
      }

      const documentUrl = await this.firebaseStorageService.uploadFile({
        file: document,
        id: userId,
        folder: FileType.PENDENCY,
      })

      await this.pendencyRepository.create({
        userId,
        title,
        description,
        status,
        dueDate,
        documentUrl,
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
