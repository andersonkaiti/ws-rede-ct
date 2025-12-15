import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IManagementTeamRepository } from '../../repositories/management-team/imanagement-team-repository.d.ts'

extendZodWithOpenApi(z)

export const findManagementTeamsSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindManagementTeamsController {
  constructor(
    private readonly managementTeamRepository: IManagementTeamRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const filter = findManagementTeamsSchema.parse(req.query)

      const teams = await this.managementTeamRepository.find({
        filter,
      })

      res.status(HttpStatus.OK).json({
        teams,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
