import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import {
  MeetingFormat,
  MeetingStatus,
} from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IMeetingRepository } from '../../repositories/meeting/imeeting-repository.d.ts'

extendZodWithOpenApi(z)

export const createMeetingSchema = z
  .object({
    title: z.string().min(1, 'Título é obrigatório'),
    scheduledAt: z.coerce.date(),
    format: z.enum(MeetingFormat).default(MeetingFormat.ONLINE),
    agenda: z.string().min(1, 'Pauta é obrigatória'),
    meetingLink: z.union([
      z.url('Link da reunião deve ser uma URL válida'),
      z.literal(''),
    ]),
    location: z.string().optional(),
    status: z.enum(MeetingStatus).default(MeetingStatus.PENDING),
  })
  .refine(
    (data) => {
      if (data.format === MeetingFormat.ONLINE) {
        return !!data.meetingLink
      }
      if (data.format === MeetingFormat.IN_PERSON) {
        return !!data.location
      }
      return true
    },
    {
      message:
        'Reuniões online devem ter link e reuniões presenciais devem ter localização',
      path: ['format'],
    },
  )

export class CreateMeetingController {
  constructor(private readonly meetingRepository: IMeetingRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        title,
        scheduledAt,
        format,
        agenda,
        meetingLink,
        location,
        status,
      } = createMeetingSchema.parse(req.body)

      await this.meetingRepository.create({
        title,
        scheduledAt,
        format,
        agenda,
        meetingLink: meetingLink || undefined,
        location: location || undefined,
        status: status ?? MeetingStatus.PENDING,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
