import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IMeetingRepository } from '../../repositories/meeting/imeeting-repository.d.ts'
import type { IMeetingMinuteRepository } from '../../repositories/meeting-minute/imeeting-minute-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_DOCUMENT_SIZE_MB = 10
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_DOCUMENT_SIZE_BYTES = MAX_DOCUMENT_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createMeetingMinuteSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  publishedAt: z.coerce.date(),
  id: z.uuid(),
  document: z.any().refine((value) => {
    if (value === undefined || value === null) {
      return false
    }

    if (typeof value !== 'object' || typeof value.size !== 'number') {
      return false
    }

    return value.size <= MAX_DOCUMENT_SIZE_BYTES
  }, `O documento deve ter no máximo ${MAX_DOCUMENT_SIZE_MB}MB.`),
})

export class CreateMeetingMinuteController {
  constructor(
    private readonly meetingMinuteRepository: IMeetingMinuteRepository,
    private readonly meetingRepository: IMeetingRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { title, publishedAt, id, document } =
        createMeetingMinuteSchema.parse({
          ...req.body,
          ...req.params,
          document: req.file,
        })

      const existingMeeting = await this.meetingRepository.findById(id)

      if (!existingMeeting) {
        throw new NotFoundError('A reunião não existe.')
      }

      const existingMinute =
        await this.meetingMinuteRepository.findByMeetingId(id)

      if (existingMinute) {
        throw new InternalServerError('Esta reunião já possui uma ata.')
      }

      const meetingMinute = await this.meetingMinuteRepository.create({
        title,
        publishedAt,
        meetingId: id,
        documentUrl: '',
      })

      const documentUrl = await this.firebaseStorageService.uploadFile({
        file: document,
        id: meetingMinute.id,
        folder: FileType.MEETING_MINUTE,
      })

      await this.meetingMinuteRepository.update({
        id: meetingMinute.id,
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
