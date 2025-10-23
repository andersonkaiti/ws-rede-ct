import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IResearcherRepository } from '../../repositories/researcher/iresearcher-repository.d.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

extendZodWithOpenApi(z)

export const findResearchersSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),

  userId: z.string().optional(),
  registrationNumber: z.string().optional(),
  name: z.string().optional(),
  emailAddress: z.string().optional(),
  mainEtps: z.string().optional(),
  formations: z.string().optional(),
  occupations: z.string().optional(),
  institutions: z.string().optional(),
  biography: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindResearchersController {
  constructor(private readonly researcherRepository: IResearcherRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, ...filter } = findResearchersSchema.parse(req.query)

      const offset = limit * page - limit

      const [researchers, totalResearchers] = await Promise.all([
        this.researcherRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter: {
            userName: filter.name,
            ...filter,
          },
        }),
        this.researcherRepository.count({
          filter: {
            userName: filter.name,
            ...filter,
          },
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalResearchers / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        researchers,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
