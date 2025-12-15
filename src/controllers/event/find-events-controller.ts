import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import {
  EventFormat,
  EventStatus,
} from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IEventRepository } from '../../repositories/event/ievent-repository.d.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

extendZodWithOpenApi(z)

export const findEventsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  title: z.string().optional(),
  status: z.enum(EventStatus).optional(),
  format: z.enum(EventFormat).optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindEventsController {
  constructor(private readonly eventRepository: IEventRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, ...filter } = findEventsSchema.parse(req.query)

      const offset = limit * page - limit

      const [events, totalEvents] = await Promise.all([
        this.eventRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter,
        }),
        this.eventRepository.count({
          filter,
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalEvents / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        events,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
