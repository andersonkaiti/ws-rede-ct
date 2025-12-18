import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import {
  EventFormat,
  EventStatus,
} from '../../../config/database/generated/enums.ts'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IEventRepository } from '../../repositories/event/ievent-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createEventSchema = z
  .object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    location: z.string().optional(),
    format: z.enum(EventFormat).default(EventFormat.ONLINE),
    eventLink: z.union([
      z.url('Link do evento deve ser uma URL válida'),
      z.literal(''),
    ]),
    status: z.enum(EventStatus).default(EventStatus.PENDING),
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
  .refine(
    (data) => {
      if (data.format === EventFormat.ONLINE) {
        return !!data.eventLink
      }
      if (data.format === EventFormat.IN_PERSON) {
        return !!data.location
      }
      return true
    },
    {
      message:
        'Eventos online devem ter link e eventos presenciais devem ter localização',
      path: ['format'],
    },
  )

export class CreateEventController {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      format,
      eventLink,
      status,
      image,
    } = createEventSchema.parse({
      ...req.body,
      image: req.file,
    })

    const event = await this.eventRepository.create({
      title,
      description,
      startDate,
      endDate,
      location: location || undefined,
      format,
      eventLink: eventLink || undefined,
      status: status ?? EventStatus.PENDING,
    })

    const imageUrl = await this.firebaseStorageService.uploadFile({
      file: image,
      folder: File.EVENT,
      id: event.id,
    })

    await this.eventRepository.update({
      id: event.id,
      imageUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
