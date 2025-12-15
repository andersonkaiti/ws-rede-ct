import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IManagementTeamRepository } from '../../repositories/management-team/imanagement-team-repository.d.ts'

extendZodWithOpenApi(z)

export const findManagementTeamByIdSchema = z.object({
  id: z.uuid(),
})

export class FindManagementTeamByIdController {
  constructor(
    private readonly managementTeamRepository: IManagementTeamRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findManagementTeamByIdSchema.parse({
        id: req.params.id,
      })

      const team = await this.managementTeamRepository.findById(id)

      if (!team) {
        throw new NotFoundError('O time de gestão não existe.')
      }

      return res.status(HttpStatus.OK).json(team)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
