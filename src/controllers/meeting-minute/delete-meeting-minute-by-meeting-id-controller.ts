import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IMeetingMinuteRepository } from '../../repositories/meeting-minute/imeeting-minute-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteMeetingMinuteByMeetingIdSchema = z.object({
  id: z.uuid(),
})

export class DeleteMeetingMinuteByMeetingIdController {
  constructor(
    private readonly meetingMinuteRepository: IMeetingMinuteRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteMeetingMinuteByMeetingIdSchema.parse(req.params)

      const existingMeetingMinute =
        await this.meetingMinuteRepository.findByMeetingId(id)

      if (!existingMeetingMinute) {
        throw new NotFoundError('A ata não existe para esta reunião.')
      }

      if (existingMeetingMinute.documentUrl) {
        await this.firebaseStorageService.deleteFile({
          fileUrl: existingMeetingMinute.documentUrl,
        })
      }

      await this.meetingMinuteRepository.deleteByMeetingId(
        existingMeetingMinute.id,
      )

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
