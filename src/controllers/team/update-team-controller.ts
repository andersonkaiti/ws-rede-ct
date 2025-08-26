import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamMemberDTO } from '../../dto/team-member.d.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.js'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.js'

export class UpdateTeamController {
  constructor(
    private readonly teamRepository: ITeamRepository,
    private readonly teamMemberRepository: ITeamMemberRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, members } = req.body

      const existingMembers = await this.teamMemberRepository.findByTeamId(id)

      const incomingIdMembers = members.map(
        (member: ITeamMemberDTO) => member.id
      )

      const memberIdsToDelete = existingMembers
        .filter((member) => !incomingIdMembers.includes(member.id))
        .map((member) => member.id)

      await this.teamMemberRepository.deleteMany(memberIdsToDelete)

      await this.teamMemberRepository.updateMany({
        id,
        members,
      })

      const team = await this.teamRepository.update({
        id,
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
