import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IResearcherRepository } from '../../repositories/researcher/iresearcher-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findResearchersSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  userId: z.string().optional(),
  registrationNumber: z.string().optional(),
  name: z.string().optional(),
  emailAddress: z.string().optional(),
  mainEtps: z.string().optional(),
  formations: z.string().optional(),
  occupations: z.string().optional(),
  institutions: z.string().optional(),
  biography: z.string().optional(),
  seniority: z.enum(['SENIOR', 'RESEARCHER', 'JUNIOR', 'HONOR']).optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindResearchersController {
  constructor(private readonly researcherRepository: IResearcherRepository) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findResearchersSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [researchers, totalResearchers] = await Promise.all([
      this.researcherRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.researcherRepository.count({
        filter,
      }),
    ])

    const totalPages = limit
      ? Math.max(Math.ceil(totalResearchers / limit), 1)
      : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      researchers,
    })
  }
}
