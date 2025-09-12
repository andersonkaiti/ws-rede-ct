import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.ts'

extendZodWithOpenApi(z)

export const updateTeamMemberBodySchema = z.object({
  id: z.uuid(),
  role: z.string(),
  userId: z.string(),
  description: z.string(),
})

export class UpdateTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = updateTeamMemberBodySchema.safeParse(req.body)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const member = parseResult.data

      const teamMember = await this.teamMemberRepository.update(member)

      res.status(HttpStatus.OK).json(teamMember)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        })
      }
    }
  }
}
