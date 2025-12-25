import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import type { IPostGraduateProgramRepository } from '../../repositories/post-graduate-program/ipost-graduate-program-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createPostGraduateProgramSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório.'),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  contact: z.string().min(1, 'Contato é obrigatório.'),
  registrationLink: z.url().optional(),
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

export class CreatePostGraduateProgramController {
  constructor(
    private readonly postGraduateProgramRepository: IPostGraduateProgramRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      title,
      description,
      startDate,
      endDate,
      contact,
      registrationLink,
      image,
    } = createPostGraduateProgramSchema.parse({
      ...req.body,
      image: req.file,
    })

    const postGraduateProgram = await this.postGraduateProgramRepository.create(
      {
        title,
        description,
        startDate,
        endDate,
        contact,
        registrationLink: registrationLink || undefined,
      },
    )

    const imageUrl = await this.firebaseStorageService.uploadFile({
      file: image,
      folder: PATHS.POST_GRADUATE_PROGRAM,
      id: postGraduateProgram.id,
    })

    await this.postGraduateProgramRepository.update({
      id: postGraduateProgram.id,
      imageUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
