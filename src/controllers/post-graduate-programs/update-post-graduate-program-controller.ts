import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IPostGraduateProgramRepository } from '../../repositories/post-graduate-program/ipost-graduate-program-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updatePostGraduateProgramSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório.').optional(),
  description: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  contact: z.string().min(1, 'Contato é obrigatório.').optional(),
  registrationLink: z.url('URL de inscrição deve ser válida').optional(),
  image: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_IMAGE_SIZE_BYTES
    }, `A imagem deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`)
    .optional(),
})

export class UpdatePostGraduateProgramController {
  constructor(
    private readonly postGraduateProgramRepository: IPostGraduateProgramRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id,
        image,
        title,
        description,
        startDate,
        endDate,
        contact,
        registrationLink,
      } = updatePostGraduateProgramSchema.parse({
        id: req.params.id,
        ...req.body,
        image: req.file,
      })

      const existingPostGraduateProgram =
        await this.postGraduateProgramRepository.findById(id)

      if (!existingPostGraduateProgram) {
        throw new NotFoundError('O programa de pós-graduação não existe.')
      }

      let imageUrl = existingPostGraduateProgram.imageUrl

      if (image) {
        imageUrl = await this.firebaseStorageService.uploadFile({
          file: image,
          id,
          folder: File.POST_GRADUATE_PROGRAM,
        })
      }

      if (!imageUrl) {
        throw new InternalServerError('URL da imagem é obrigatório')
      }

      await this.postGraduateProgramRepository.update({
        id,
        title,
        description,
        startDate,
        endDate,
        contact,
        registrationLink,
        imageUrl,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
