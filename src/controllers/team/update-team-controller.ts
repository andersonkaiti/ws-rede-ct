import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamMemberDTO } from '../../dto/team-member.d.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.ts'

const updateTeamParamsSchema = z.object({
  id: z.uuid(),
})

const updateTeamBodySchema = z.object({
  name: z.string().min(1),
  members: z.array(
    z.object({
      role: z.string(),
      user: z.object({
        id: z.string(),
        first_name: z.string(),
        last_name: z.string().optional(),
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
      const paramsResult = updateTeamParamsSchema.safeParse(req.params)
      if (!paramsResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.treeifyError?.(paramsResult.error),
        })
      }

      const bodyResult = updateTeamBodySchema.safeParse(req.body)
      if (!bodyResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.treeifyError(bodyResult.error),
        })
      }

      const { id: teamId } = paramsResult.data
      const { name, members } = bodyResult.data

      const existingMembers =
        await this.teamMemberRepository.findByTeamId(teamId)

      const incomingIdMembers = members.map(
        (member: Omit<ITeamMemberDTO, 'team_id' | 'user_id'>) => member.id
      )

      const memberIdsToDelete = existingMembers
        .filter((member) => !incomingIdMembers.includes(member.id))
        .map((member) => member.id)

      await this.teamMemberRepository.deleteMany(memberIdsToDelete)

      await this.teamMemberRepository.updateMany({
        id: teamId,
        members,
      })

      const team = await this.teamRepository.update({
        id: teamId,
        name,
      })

      res.status(HttpStatus.OK).json(team)
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message,
        })
      }
    }
  }
}
