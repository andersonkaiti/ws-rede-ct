import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IMeetingRepository } from '../../repositories/meeting/imeeting-repository.d.ts'

extendZodWithOpenApi(z)

export const findMeetingByIdSchema = z.object({
  id: z.uuid(),
})

export class FindMeetingByIdController {
  constructor(private readonly meetingRepository: IMeetingRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findMeetingByIdSchema.parse({
        id: req.params.id,
      })

      const meeting = await this.meetingRepository.findById(id)

      if (!meeting) {
        throw new NotFoundError('A reunião não existe.')
      }

      return res.status(HttpStatus.OK).json(meeting)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
