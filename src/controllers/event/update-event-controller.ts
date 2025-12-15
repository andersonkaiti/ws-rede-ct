import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import {
  EventFormat,
  EventStatus,
} from '../../../config/database/generated/enums.ts'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IEventRepository } from '../../repositories/event/ievent-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateEventSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório').optional(),
  description: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  location: z.string().optional(),
  format: z.enum(EventFormat).optional(),
  eventLink: z.union([
    z.url('Link do evento deve ser uma URL válida'),
    z.literal(''),
  ]),
  status: z.enum(EventStatus).optional(),
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
    )
    .optional(),
})

export class UpdateEventController {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id,
        title,
        description,
        startDate,
        endDate,
        location,
        format,
        eventLink,
        status,
        image,
      } = updateEventSchema.parse({
        id: req.params.id,
        ...req.body,
        image: req.file,
      })

      const existingEvent = await this.eventRepository.findById(id)

      if (!existingEvent) {
        throw new NotFoundError('O evento não existe.')
      }

      let imageUrl: string | undefined

      if (image) {
        imageUrl = await this.firebaseStorageService.uploadFile({
          file: image,
          folder: File.EVENT,
          id,
        })
      }

      await this.eventRepository.update({
        id,
        title,
        description,
        startDate,
        endDate,
        location: location || undefined,
        format,
        eventLink: eventLink || undefined,
        status,
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
