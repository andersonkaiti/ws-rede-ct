import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.d.ts'

const deleteTeamMemberSchema = z.object({
  id: z.uuid(),
})

export class DeleteTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = deleteTeamMemberSchema.safeParse(req.params)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.treeifyError(parseResult.error),
        })
      }

      const { id } = parseResult.data

      await this.teamMemberRepository.delete(id)

      res.status(HttpStatus.OK).json({
        message: 'Membro removido com sucesso',
      })
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
