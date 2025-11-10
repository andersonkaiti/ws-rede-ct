import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IMeetingRepository } from '../../repositories/meeting/imeeting-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteMeetingSchema = z.object({
  id: z.uuid(),
})

export class DeleteMeetingController {
  constructor(private readonly meetingRepository: IMeetingRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteMeetingSchema.parse({
        id: req.params.id,
      })

      const existingMeeting = await this.meetingRepository.findById(id)

      if (!existingMeeting) {
        throw new NotFoundError('A reunião não existe.')
      }

      await this.meetingRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}

