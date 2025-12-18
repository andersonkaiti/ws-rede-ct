import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ISDHCTeamMemberRepository } from '../../repositories/sdhc-team-member/isdhc-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteSDHCTeamMemberSchema = z.object({
  id: z.uuid(),
})

export class DeleteSDHCTeamMemberController {
  constructor(
    private readonly sdhcTeamMemberRepository: ISDHCTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteSDHCTeamMemberSchema.parse({
      id: req.params.id,
    })

    const existingMember = await this.sdhcTeamMemberRepository.findById(id)

    if (!existingMember) {
      throw new NotFoundError('O membro da equipe SDHC não existe.')
    }

    await this.sdhcTeamMemberRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
