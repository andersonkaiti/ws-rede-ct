import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.js'

export class CreateTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { team_id } = req.params
      const { member } = req.body

      const teamMember = await this.teamMemberRepository.create({
        team_id,
        ...member,
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
