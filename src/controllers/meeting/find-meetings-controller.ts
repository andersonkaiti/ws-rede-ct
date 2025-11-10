import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { MeetingFormat, MeetingStatus } from '@prisma/client'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IMeetingRepository } from '../../repositories/meeting/imeeting-repository.js'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

extendZodWithOpenApi(z)

export const findMeetingSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  title: z.string().optional(),
  format: z.enum(MeetingFormat).optional(),
  status: z.enum(MeetingStatus).optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindMeetingsController {
  constructor(private readonly meetingRepository: IMeetingRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, ...filter } = findMeetingSchema.parse(req.query)

      const offset = limit * page - limit

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

      const totalPages = Math.max(Math.ceil(totalMeetings / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        meetings,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
