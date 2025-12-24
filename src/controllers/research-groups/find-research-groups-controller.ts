import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IResearchGroupRepository } from '../../repositories/research-group/iresearch-group-repository.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findResearchGroupsControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  name: z.string().optional(),
  acronym: z.string().optional(),
  description: z.string().optional(),
  leader: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindResearchGroupsController {
  constructor(
    private readonly researchGroupRepository: IResearchGroupRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { limit, page, ...filter } = findResearchGroupsControllerSchema.parse(
      req.query,
    )

    const offset = limit ? limit * page - limit : undefined

    const [researchGroups, totalResearchGroups] = await Promise.all([
      this.researchGroupRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),

      this.researchGroupRepository.count({
        filter,
      }),
    ])

    const totalPages = limit
      ? Math.max(Math.ceil(totalResearchGroups / limit), 1)
      : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      researchGroups,
    })
  }
}
