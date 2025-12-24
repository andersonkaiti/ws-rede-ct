import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IBookVolumeRepository } from '../../repositories/book-volume/ibook-volume-repository.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findBookVolumesControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  title: z.string().optional(),
  author: z.string().optional(),
  description: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindBookVolumesController {
  constructor(private readonly bookVolumeRepository: IBookVolumeRepository) {}

  async handle(req: Request, res: Response) {
    const { limit, page, ...filter } = findBookVolumesControllerSchema.parse(
      req.query,
    )

    const offset = limit ? limit * page - limit : undefined

    const [bookVolumes, totalBookVolumes] = await Promise.all([
      this.bookVolumeRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),

      this.bookVolumeRepository.count({
        filter,
      }),
    ])

    const totalPages = limit
      ? Math.max(Math.ceil(totalBookVolumes / limit), 1)
      : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      bookVolumes,
    })
  }
}
