import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
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
      const member = updateTeamMemberBodySchema.parse(req.body)

      const teamMember = await this.teamMemberRepository.update(member)

      res.status(HttpStatus.OK).json(teamMember)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
