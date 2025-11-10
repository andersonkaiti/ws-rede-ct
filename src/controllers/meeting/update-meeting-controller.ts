import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { MeetingFormat, MeetingStatus } from '@prisma/client'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IMeetingRepository } from '../../repositories/meeting/imeeting-repository.d.ts'

extendZodWithOpenApi(z)

export const updateMeetingSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório').optional(),
  scheduledAt: z.coerce.date().optional(),
  format: z.enum(MeetingFormat).optional(),
  agenda: z.string().min(1, 'Pauta é obrigatória').optional(),
  meetingLink: z
    .string()
    .url('Link da reunião deve ser uma URL válida')
    .optional()
    .or(z.literal('')),
  location: z.string().optional(),
  status: z.enum(MeetingStatus).optional(),
})

export class UpdateMeetingController {
  constructor(private readonly meetingRepository: IMeetingRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id,
        title,
        scheduledAt,
        format,
        agenda,
        meetingLink,
        location,
        status,
      } = updateMeetingSchema.parse({
        id: req.params.id,
        ...req.body,
      })

      const existingMeeting = await this.meetingRepository.findById(id)

      if (!existingMeeting) {
        throw new NotFoundError('A reunião não existe.')
      }

      await this.meetingRepository.update({
        id,
        title,
        scheduledAt,
        format,
        agenda,
        meetingLink: meetingLink || undefined,
        location: location || undefined,
        status,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
