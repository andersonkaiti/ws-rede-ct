import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.ts'

extendZodWithOpenApi(z)

export const findTeamMemberParamsSchema = z.object({
  id: z.uuid(),
})

export class FindTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findTeamMemberParamsSchema.parse(req.params)

      const teamMember = await this.teamMemberRepository.findById(id)

      if (!teamMember) {
        throw new NotFoundError('Membro não encontrado.')
      }

      res.status(HttpStatus.OK).json(teamMember)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
