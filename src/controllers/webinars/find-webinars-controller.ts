import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IWebinarRepository } from '../../repositories/webinar/iwebinar-repository.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findWebinarsControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindWebinarsController {
  constructor(private readonly webinarRepository: IWebinarRepository) {}

  async handle(req: Request, res: Response) {
    const { limit, page, ...filter } = findWebinarsControllerSchema.parse(
      req.query,
    )

    const offset = limit ? limit * page - limit : undefined

    const [webinars, totalWebinars] = await Promise.all([
      this.webinarRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),

      this.webinarRepository.count({
        filter,
      }),
    ])

    const totalPages = limit ? Math.max(Math.ceil(totalWebinars / limit), 1) : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      webinars,
    })
  }
}
