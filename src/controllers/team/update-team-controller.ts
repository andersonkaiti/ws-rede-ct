import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IIncomingMembers } from '../../dto/team.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.ts'

extendZodWithOpenApi(z)

export const updateTeamBodySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  members: z.array(
    z.object({
      role: z.string(),
      id: z.uuid().optional(),
      user: z.object({
        id: z.uuid(),
      }),
    })
  ),
})

export class UpdateTeamController {
  constructor(
    private readonly teamRepository: ITeamRepository,
    private readonly teamMemberRepository: ITeamMemberRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id: teamId,
        members,
        name,
      } = updateTeamBodySchema.parse({
        id: req.params.id,
        ...req.body,
      })

      const existingMembers =
        await this.teamMemberRepository.findByTeamId(teamId)

      const incomingIdMembers = members.map(
        (member: IIncomingMembers) => member.id
      )

      const memberIdsToDelete = existingMembers
        .filter((member) => !incomingIdMembers.includes(member.id))
        .map((member) => member.id)

      await this.teamMemberRepository.deleteMany(memberIdsToDelete)

      await this.teamMemberRepository.updateMany({
        teamId,
        members,
      })

      await this.teamRepository.update({
        id: teamId,
        name,
      })

      res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
