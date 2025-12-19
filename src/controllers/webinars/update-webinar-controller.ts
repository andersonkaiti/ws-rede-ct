import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IWebinarRepository } from '../../repositories/webinar/iwebinar-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateWebinarSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório.').optional(),
  description: z.string().optional(),
  scheduledAt: z.coerce.date().optional(),
  webinarLink: z.url('URL do webinar deve ser válida').optional(),
  guestIds: z
    .transform((value) =>
      typeof value === 'string' ? value.split(',') : value,
    )
    .pipe(z.array(z.uuid()))
    .optional(),
  thumbnail: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_IMAGE_SIZE_BYTES
    }, `A thumbnail deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`)
    .optional(),
})

export class UpdateWebinarController {
  constructor(
    private readonly webinarRepository: IWebinarRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      thumbnail,
      title,
      description,
      scheduledAt,
      webinarLink,
      guestIds,
    } = updateWebinarSchema.parse({
      id: req.params.id,
      ...req.body,
      thumbnail: req.file,
    })

    const existingWebinar = await this.webinarRepository.findById(id)

    if (!existingWebinar) {
      throw new NotFoundError('O webinar não existe.')
    }

    let thumbnailUrl = existingWebinar.thumbnailUrl

    if (thumbnail) {
      thumbnailUrl = await this.firebaseStorageService.uploadFile({
        file: thumbnail,
        id,
        folder: File.WEBINAR,
      })
    }

    if (!thumbnailUrl) {
      throw new InternalServerError('Thumbnail URL é obrigatório')
    }

    await this.webinarRepository.update({
      id,
      title,
      description,
      scheduledAt,
      webinarLink,
      thumbnailUrl,
      guestIds,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
