import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { ICourseRepository } from '../../repositories/course/icourse-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateCourseSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório.').optional(),
  coordinatorId: z.string().uuid('Coordenador é obrigatório.').optional(),
  email: z.string().email('E-mail deve ser válido.').optional(),
  location: z.string().min(1, 'Localização é obrigatória.').optional(),
  scheduledAt: z.coerce.date().optional(),
  registrationLink: z.url('URL de inscrição deve ser válida').optional(),
  description: z.string().optional(),
  instructorIds: z
    .transform((value) =>
      typeof value === 'string' ? value.split(',') : value
    )
    .pipe(z.array(z.uuid()))
    .optional(),
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

export class UpdateCourseController {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id,
        image,
        title,
        coordinatorId,
        email,
        location,
        scheduledAt,
        registrationLink,
        description,
        instructorIds,
      } = updateCourseSchema.parse({
        id: req.params.id,
        ...req.body,
        image: req.file,
      })

      const existingCourse = await this.courseRepository.findById(id)

      if (!existingCourse) {
        throw new NotFoundError('O curso não existe.')
      }

      let imageUrl = existingCourse.imageUrl

      if (image) {
        imageUrl = await this.firebaseStorageService.uploadFile({
          file: image,
          id,
          folder: File.COURSE,
        })
      }

      if (!imageUrl) {
        throw new InternalServerError('URL da imagem é obrigatório')
      }

      await this.courseRepository.update({
        id,
        title,
        coordinatorId,
        email,
        location,
        scheduledAt,
        registrationLink,
        description,
        imageUrl,
        instructorIds,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
