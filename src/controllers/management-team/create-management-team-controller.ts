import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { ConflictError } from '../../errrors/conflict-error.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IManagementTeamRepository } from '../../repositories/management-team/imanagement-team-repository.d.ts'

extendZodWithOpenApi(z)

export const createManagementTeamSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  members: z.array(
    z.object({
      userId: z.uuid(),
      role: z.string().min(1),
      order: z.number().optional(),
    }),
  ),
})

export class CreateManagementTeamController {
  constructor(
    private readonly managementTeamRepository: IManagementTeamRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { name, description, members } = createManagementTeamSchema.parse(
        req.body,
      )

      const existingTeam = await this.managementTeamRepository.findByName(name)

      if (existingTeam) {
        throw new ConflictError(
          'Já existe um time de gestão cadastrado com este nome.',
        )
      }

      await this.managementTeamRepository.create({
        name,
        description,
        members: members.map((member) => ({
          userId: member.userId,
          role: member.role,
          order: member.order ?? 0,
        })),
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
