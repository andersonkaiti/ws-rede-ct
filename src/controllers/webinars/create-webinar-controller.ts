import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IWebinarRepository } from '../../repositories/webinar/iwebinar-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createWebinarSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório.'),
  description: z.string().optional(),
  scheduledAt: z.coerce.date(),
  webinarLink: z.url().optional(),
  guestIds: z
    .transform((value) =>
      typeof value === 'string' ? value.split(',') : value,
    )
    .pipe(z.array(z.uuid())),
  thumbnail: z
    .any()
    .refine(
      (file) =>
        !file ||
        (typeof file === 'object' &&
          typeof file.mimetype === 'string' &&
          file.mimetype.startsWith('image/') &&
          typeof file.size === 'number' &&
          file.size <= MAX_IMAGE_SIZE_BYTES),
      'A thumbnail deve ser uma imagem válida de no máximo 5MB.',
    ),
})

export class CreateWebinarController {
  constructor(
    private readonly webinarRepository: IWebinarRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        scheduledAt,
        webinarLink,
        guestIds,
        thumbnail,
      } = createWebinarSchema.parse({
        ...req.body,
        thumbnail: req.file,
      })

      const webinar = await this.webinarRepository.create({
        title,
        description,
        scheduledAt,
        webinarLink: webinarLink || undefined,
        guestIds,
      })

      const thumbnailUrl = await this.firebaseStorageService.uploadFile({
        file: thumbnail,
        folder: File.WEBINAR,
        id: webinar.id,
      })

      await this.webinarRepository.update({
        id: webinar.id,
        thumbnailUrl,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
