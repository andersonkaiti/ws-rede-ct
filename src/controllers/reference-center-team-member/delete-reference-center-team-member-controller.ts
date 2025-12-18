import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IReferenceCenterTeamMemberRepository } from '../../repositories/reference-center-team-member/ireference-center-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteReferenceCenterTeamMemberSchema = z.object({
  id: z.uuid(),
})

export class DeleteReferenceCenterTeamMemberController {
  constructor(
    private readonly referenceCenterTeamMemberRepository: IReferenceCenterTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteReferenceCenterTeamMemberSchema.parse({
      id: req.params.id,
    })

    const existingMember =
      await this.referenceCenterTeamMemberRepository.findById(id)

    if (!existingMember) {
      throw new NotFoundError('O membro do centro de referência não existe.')
    }

    await this.referenceCenterTeamMemberRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
