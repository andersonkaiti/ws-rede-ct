import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.ts'

const updateTeamMemberBodySchema = z.object({
  member: z.object({
    id: z.uuid(),
    role: z.string(),
    user_id: z.string(),
    description: z.string(),
  }),
})

export class UpdateTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = updateTeamMemberBodySchema.safeParse(req.body)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.treeifyError(parseResult.error),
        })
      }

      const { member } = parseResult.data

      const teamMember = await this.teamMemberRepository.update({
        member,
      })

      res.status(HttpStatus.OK).json(teamMember)
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
