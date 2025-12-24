import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IMuseumRepository } from '../../repositories/museum/imuseum-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findMuseumsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  name: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindMuseumsController {
  constructor(private readonly museumRepository: IMuseumRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findMuseumsSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [museums, totalMuseums] = await Promise.all([
      this.museumRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.museumRepository.count({
        filter,
      }),
    ])

    const totalPages = limit ? Math.max(Math.ceil(totalMuseums / limit), 1) : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      museums,
    })
  }
}
