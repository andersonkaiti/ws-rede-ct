import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IMeetingMinuteRepository } from '../../repositories/meeting-minute/imeeting-minute-repository.d.ts'

extendZodWithOpenApi(z)

export const findMeetingMinuteByMeetingIdSchema = z.object({
  meetingId: z.uuid(),
})

export class FindMeetingMinuteByMeetingIdController {
  constructor(private readonly meetingMinuteRepository: IMeetingMinuteRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { meetingId } = findMeetingMinuteByMeetingIdSchema.parse({
        meetingId: req.params.meetingId,
      })

      const meetingMinute = await this.meetingMinuteRepository.findByMeetingId(meetingId)

      return res.status(HttpStatus.OK).json(meetingMinute)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}

