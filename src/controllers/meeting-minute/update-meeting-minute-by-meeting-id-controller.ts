import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IMeetingMinuteRepository } from '../../repositories/meeting-minute/imeeting-minute-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_DOCUMENT_SIZE_MB = 10
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_DOCUMENT_SIZE_BYTES = MAX_DOCUMENT_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateMeetingMinuteByMeetingIdSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório').optional(),
  publishedAt: z.coerce.date().optional(),
  document: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_DOCUMENT_SIZE_BYTES
    }, `O documento deve ter no máximo ${MAX_DOCUMENT_SIZE_MB}MB.`)
    .optional(),
})

export class UpdateMeetingMinuteByMeetingIdController {
  constructor(
    private readonly meetingMinuteRepository: IMeetingMinuteRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, title, publishedAt, document } =
      updateMeetingMinuteByMeetingIdSchema.parse({
        ...req.params,
        ...req.body,
        document: req.file,
      })

    const existingMeetingMinute =
      await this.meetingMinuteRepository.findByMeetingId(id)

    if (!existingMeetingMinute) {
      throw new NotFoundError('A ata não existe para esta reunião.')
    }

    let documentUrl = existingMeetingMinute.documentUrl

    if (document) {
      if (existingMeetingMinute.documentUrl) {
        await this.firebaseStorageService.deleteFile({
          fileUrl: existingMeetingMinute.documentUrl,
        })
      }

      documentUrl = await this.firebaseStorageService.uploadFile({
        file: document,
        id: existingMeetingMinute.id,
        folder: FileType.MEETING_MINUTE,
      })
    }

    await this.meetingMinuteRepository.update({
      id: existingMeetingMinute.id,
      title,
      publishedAt,
      documentUrl: documentUrl ?? undefined,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
