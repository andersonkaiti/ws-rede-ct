import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.ts'

extendZodWithOpenApi(z)

export const findTeamMemberParamsSchema = z.object({
  id: z.uuid(),
})

export class FindTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = findTeamMemberParamsSchema.safeParse(req.params)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { id } = parseResult.data

      const teamMember = await this.teamMemberRepository.findById(id)

      if (!teamMember) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Membro não encontrado.',
        })
      }

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
