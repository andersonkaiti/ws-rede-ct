import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { ILegitimatorCommitteeMemberRepository } from '../../repositories/legitimator-committee-member/ilegitimator-committee-member-repository.d.ts'

extendZodWithOpenApi(z)

export const findLegitimatorCommitteeMemberByIdSchema = z.object({
  id: z.uuid(),
})

export class FindLegitimatorCommitteeMemberByIdController {
  constructor(
    private readonly legitimatorCommitteeMemberRepository: ILegitimatorCommitteeMemberRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findLegitimatorCommitteeMemberByIdSchema.parse({
        id: req.params.id,
      })

      const member =
        await this.legitimatorCommitteeMemberRepository.findById(id)

      if (!member) {
        throw new NotFoundError('O membro do comitê legitimador não existe.')
      }

      return res.status(HttpStatus.OK).json(member)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
