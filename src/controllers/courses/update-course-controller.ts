import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ICourseRepository } from '../../repositories/course/icourse-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updateCourseSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório.').optional(),
  coordinatorId: z.uuid('Coordenador é obrigatório.').optional(),
  email: z.email('E-mail deve ser válido.').optional(),
  location: z.string().min(1, 'Localização é obrigatória.').optional(),
  scheduledAt: z.coerce.date().optional(),
  registrationLink: z.url('URL de inscrição deve ser válida').optional(),
  description: z.string().optional(),
  instructorIds: z
    .transform((value) =>
      typeof value === 'string' ? value.split(',') : value,
    )
    .pipe(z.array(z.uuid()))
    .optional(),
  image: z
    .any()
    .refine((file) =>
      validateImageFile({
        file,
        optional: true,
      }),
    )
    .optional(),
})

export class UpdateCourseController {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
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
        folder: PATHS.COURSE,
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
  }
}
