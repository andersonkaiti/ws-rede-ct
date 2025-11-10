import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { MeetingStatus } from '@prisma/client'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IMeetingRepository } from '../../repositories/meeting/imeeting-repository.d.ts'

extendZodWithOpenApi(z)

export const findMeetingByStatusSchema = z.object({
  status: z.enum(MeetingStatus),
})

export class FindMeetingByStatusController {
  constructor(private readonly meetingRepository: IMeetingRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { status } = findMeetingByStatusSchema.parse({
        status: req.params.status,
      })

      const meetings = await this.meetingRepository.findByStatus(status)

      return res.status(HttpStatus.OK).json(meetings)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
