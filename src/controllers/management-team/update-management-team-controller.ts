import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { ConflictError } from '../../errrors/conflict-error.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IManagementTeamRepository } from '../../repositories/management-team/imanagement-team-repository.d.ts'

extendZodWithOpenApi(z)

export const updateManagementTeamSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  members: z
    .array(
      z.object({
        userId: z.uuid(),
        role: z.string().min(1),
        order: z.number().optional(),
      })
    )
    .optional(),
})

export class UpdateManagementTeamController {
  constructor(
    private readonly managementTeamRepository: IManagementTeamRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id, name, description, members } =
        updateManagementTeamSchema.parse({
          id: req.params.id,
          ...req.body,
        })

      const existingTeam = await this.managementTeamRepository.findById(id)

      if (!existingTeam) {
        throw new NotFoundError('O time de gestão não existe.')
      }

      if (name && name !== existingTeam.name) {
        const teamWithSameName =
          await this.managementTeamRepository.findByName(name)

        if (teamWithSameName && teamWithSameName.id !== id) {
          throw new ConflictError('Já existe um time de gestão com este nome.')
        }
      }

      await this.managementTeamRepository.update({
        id,
        name,
        description,
        members: members
          ? members.map((member) => ({
              userId: member.userId,
              role: member.role,
              order: member.order ?? 0,
            }))
          : undefined,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
