import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { RegimentStatus } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IRegimentRepository } from '../../repositories/regiment/iregiment-repository.js'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findRegimentSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  title: z.string().optional(),
  status: z.enum(RegimentStatus).optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindRegimentsController {
  constructor(private readonly regimentRepository: IRegimentRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findRegimentSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [regiments, totalRegiments] = await Promise.all([
      this.regimentRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.regimentRepository.count({
        filter,
      }),
    ])

    const totalPages = limit
      ? Math.max(Math.ceil(totalRegiments / limit), 1)
      : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      regiments,
    })
  }
}
