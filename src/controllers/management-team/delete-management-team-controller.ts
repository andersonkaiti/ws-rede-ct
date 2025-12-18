import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IManagementTeamRepository } from '../../repositories/management-team/imanagement-team-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteManagementTeamSchema = z.object({
  id: z.uuid(),
})

export class DeleteManagementTeamController {
  constructor(
    private readonly managementTeamRepository: IManagementTeamRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteManagementTeamSchema.parse({
      id: req.params.id,
    })

    const existingTeam = await this.managementTeamRepository.findById(id)

    if (!existingTeam) {
      throw new NotFoundError('O time de gestão não existe.')
    }

    await this.managementTeamRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
