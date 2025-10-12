import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteTeamMemberSchema = z.object({
  id: z.uuid(),
})

export class DeleteTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteTeamMemberSchema.parse(req.params)

      await this.teamMemberRepository.delete(id)

      res.sendStatus(HttpStatus.OK)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
