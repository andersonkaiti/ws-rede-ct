import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { PendencyStatus } from '../../../config/database/generated/enums.ts'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { BadRequestError } from '../../errrors/bad-request-error.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const createPendencySchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(PendencyStatus).default('PENDING'),
  dueDate: z.coerce.date().optional(),
  document: z
    .any()
    .refine(
      (file) => file && typeof file === 'object' && file.size > 0,
      'Arquivo do documento é obrigatório',
    ),
})

export class CreatePendencyController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly pendencyRepository: IPendencyRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id, title, description, status, dueDate, document } =
        createPendencySchema.parse({
          ...req.body,
          ...req.params,
          document: req.file,
        })

      const user = await this.userRepository.findById(id)

      if (!user) {
        throw new BadRequestError('O usuário não existe.')
      }

      const documentUrl = await this.firebaseStorageService.uploadFile({
        file: document,
        id,
        folder: FileType.PENDENCY,
      })

      await this.pendencyRepository.create({
        userId: id,
        title,
        description,
        status,
        dueDate,
        documentUrl,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
