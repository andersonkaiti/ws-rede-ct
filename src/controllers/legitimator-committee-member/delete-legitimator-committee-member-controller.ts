import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ILegitimatorCommitteeMemberRepository } from '../../repositories/legitimator-committee-member/ilegitimator-committee-member-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteLegitimatorCommitteeMemberSchema = z.object({
  id: z.uuid(),
})

export class DeleteLegitimatorCommitteeMemberController {
  constructor(
    private readonly legitimatorCommitteeMemberRepository: ILegitimatorCommitteeMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteLegitimatorCommitteeMemberSchema.parse({
      id: req.params.id,
    })

    const existingMember =
      await this.legitimatorCommitteeMemberRepository.findById(id)

    if (!existingMember) {
      throw new NotFoundError('O membro do comitê legitimador não existe.')
    }

    await this.legitimatorCommitteeMemberRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
