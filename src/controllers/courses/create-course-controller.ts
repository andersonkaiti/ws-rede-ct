import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { ICourseRepository } from '../../repositories/course/icourse-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createCourseSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório.'),
  coordinatorId: z.string().uuid('Coordenador é obrigatório.'),
  email: z.email('E-mail deve ser válido.'),
  location: z.string().min(1, 'Localização é obrigatória.'),
  scheduledAt: z.coerce.date(),
  registrationLink: z.url().optional(),
  description: z.string().optional(),
  instructorIds: z
    .transform((value) =>
      typeof value === 'string' ? value.split(',') : value,
    )
    .pipe(z.array(z.uuid())),
  image: z
    .any()
    .refine(
      (file) =>
        !file ||
        (typeof file === 'object' &&
          typeof file.mimetype === 'string' &&
          file.mimetype.startsWith('image/') &&
          typeof file.size === 'number' &&
          file.size <= MAX_IMAGE_SIZE_BYTES),
      'A imagem deve ser uma imagem válida de no máximo 5MB.',
    ),
})

export class CreateCourseController {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        title,
        coordinatorId,
        email,
        location,
        scheduledAt,
        registrationLink,
        description,
        instructorIds,
        image,
      } = createCourseSchema.parse({
        ...req.body,
        image: req.file,
      })

      const course = await this.courseRepository.create({
        title,
        coordinatorId,
        email,
        location,
        scheduledAt,
        registrationLink: registrationLink || undefined,
        description,
        instructorIds,
      })

      const imageUrl = await this.firebaseStorageService.uploadFile({
        file: image,
        folder: File.COURSE,
        id: course.id,
      })

      await this.courseRepository.update({
        id: course.id,
        imageUrl,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
