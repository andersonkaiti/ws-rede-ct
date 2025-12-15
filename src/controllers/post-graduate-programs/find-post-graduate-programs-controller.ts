import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IPostGraduateProgramRepository } from '../../repositories/post-graduate-program/ipost-graduate-program-repository.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

extendZodWithOpenApi(z)

export const findPostGraduateProgramsControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  title: z.string().optional(),
  description: z.string().optional(),
  contact: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindPostGraduateProgramsController {
  constructor(
    private readonly postGraduateProgramRepository: IPostGraduateProgramRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { limit, page, ...filter } =
        findPostGraduateProgramsControllerSchema.parse(req.query)

      const offset = page * limit - limit

      const [postGraduatePrograms, totalPostGraduatePrograms] =
        await Promise.all([
          this.postGraduateProgramRepository.find({
            pagination: {
              offset,
              limit,
            },
            filter,
          }),

          this.postGraduateProgramRepository.count({
            filter,
          }),
        ])

      const totalPages = Math.max(
        Math.ceil(totalPostGraduatePrograms / limit),
        1,
      )

      return res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        postGraduatePrograms,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
