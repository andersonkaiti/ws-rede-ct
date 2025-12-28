import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IMeetingRepository } from '../../repositories/meeting/imeeting-repository.d.ts'
import type { IMeetingMinuteRepository } from '../../repositories/meeting-minute/imeeting-minute-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validatePdfFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const createMeetingMinuteSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  publishedAt: z.coerce.date(),
  id: z.uuid(),
  document: z.any().refine((file) =>
    validatePdfFile({
      file,
    }),
  ),
})

export class CreateMeetingMinuteController {
  constructor(
    private readonly meetingMinuteRepository: IMeetingMinuteRepository,
    private readonly meetingRepository: IMeetingRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
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
      folder: PATHS.MEETING_MINUTE,
    })

    await this.meetingMinuteRepository.update({
      id: meetingMinute.id,
      documentUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
