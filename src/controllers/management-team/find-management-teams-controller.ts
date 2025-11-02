import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IManagementTeamRepository } from '../../repositories/management-team/imanagement-team-repository.d.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

extendZodWithOpenApi(z)

export const findManagementTeamsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  name: z.string().optional(),
  description: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindManagementTeamsController {
  constructor(
    private readonly managementTeamRepository: IManagementTeamRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, ...filter } = findManagementTeamsSchema.parse(
        req.query
      )

      const offset = limit * page - limit

      const [teams, totalTeams] = await Promise.all([
        this.managementTeamRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter,
        }),
        this.managementTeamRepository.count({
          filter,
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalTeams / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        teams,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
