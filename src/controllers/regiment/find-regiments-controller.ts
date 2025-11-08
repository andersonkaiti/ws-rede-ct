import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { RegimentStatus } from '@prisma/client'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IRegimentRepository } from '../../repositories/regiment/iregiment-repository.js'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

extendZodWithOpenApi(z)

export const findRegimentSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  title: z.string().optional(),
  status: z.enum(RegimentStatus).optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindRegimentsController {
  constructor(private readonly regimentRepository: IRegimentRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, ...filter } = findRegimentSchema.parse(req.query)

      const offset = limit * page - limit

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

      const totalPages = Math.max(Math.ceil(totalRegiments / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        regiments,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
