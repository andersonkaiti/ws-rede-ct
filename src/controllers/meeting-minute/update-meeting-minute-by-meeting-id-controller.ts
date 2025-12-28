import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IMeetingMinuteRepository } from '../../repositories/meeting-minute/imeeting-minute-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validatePdfFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updateMeetingMinuteByMeetingIdSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório').optional(),
  publishedAt: z.coerce.date().optional(),
  document: z
    .any()
    .refine((file) =>
      validatePdfFile({
        file,
        optional: true,
      }),
    )
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
        folder: PATHS.MEETING_MINUTE,
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
