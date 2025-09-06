import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IIncomingMembers } from '../../dto/team.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.ts'

const updateTeamBodySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  members: z.array(
    z.object({
      role: z.string(),
      id: z.uuid(),
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
      const parseResult = updateTeamBodySchema.safeParse({
        id: req.params.id,
        ...req.body,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { name, members, id: teamId } = parseResult.data

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

      const team = await this.teamRepository.update({
        id: teamId,
        name,
      })

      res.status(HttpStatus.OK).json(team)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message,
        })
      }
    }
  }
}
