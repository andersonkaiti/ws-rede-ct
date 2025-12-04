import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IBookVolumeRepository } from '../../repositories/book-volume/ibook-volume-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

extendZodWithOpenApi(z)

export const findBookVolumesControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  author: z.string().optional(),
  description: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindBookVolumesController {
  constructor(private readonly bookVolumeRepository: IBookVolumeRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { limit, page, ...filter } = findBookVolumesControllerSchema.parse(
        req.query
      )

      const offset = page * limit - limit

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

      const totalPages = Math.max(Math.ceil(totalBookVolumes / limit), 1)

      return res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        bookVolumes,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
