import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.ts'

const createTeamMemberSchema = z.object({
  member: z.object({
    user_id: z.string(),
    role: z.string(),
    description: z.string(),
  }),
})

export class CreateTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { team_id } = req.params
      const parseResult = createTeamMemberSchema.safeParse(req.body)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.treeifyError(parseResult.error),
        })
      }

      const { member } = parseResult.data

      const teamMember = await this.teamMemberRepository.create({
        ...member,
        team_id,
      })

      res.status(HttpStatus.CREATED).json(teamMember)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
