import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { ISDHCTeamMemberRepository } from '../../repositories/sdhc-team-member/isdhc-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const findSDHCTeamMemberByIdSchema = z.object({
  id: z.uuid(),
})

export class FindSDHCTeamMemberByIdController {
  constructor(
    private readonly sdhcTeamMemberRepository: ISDHCTeamMemberRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findSDHCTeamMemberByIdSchema.parse({
        id: req.params.id,
      })

      const member = await this.sdhcTeamMemberRepository.findById(id)

      if (!member) {
        throw new NotFoundError('O membro da equipe SDHC não existe.')
      }

      return res.status(HttpStatus.OK).json(member)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
