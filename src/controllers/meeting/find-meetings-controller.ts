import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import {
  MeetingFormat,
  MeetingStatus,
} from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IMeetingRepository } from '../../repositories/meeting/imeeting-repository.js'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findMeetingSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  title: z.string().optional(),
  format: z.enum(MeetingFormat).optional(),
  status: z.enum(MeetingStatus).optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindMeetingsController {
  constructor(private readonly meetingRepository: IMeetingRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findMeetingSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [meetings, totalMeetings] = await Promise.all([
      this.meetingRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.meetingRepository.count({
        filter,
      }),
    ])

    const totalPages = limit ? Math.max(Math.ceil(totalMeetings / limit), 1) : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      meetings,
    })
  }
}
