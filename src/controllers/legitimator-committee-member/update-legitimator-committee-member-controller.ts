import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { ILegitimatorCommitteeMemberRepository } from '../../repositories/legitimator-committee-member/ilegitimator-committee-member-repository.d.ts'

extendZodWithOpenApi(z)

export const updateLegitimatorCommitteeMemberSchema = z.object({
  id: z.uuid(),
  role: z.string().min(1).optional(),
  description: z.string().optional(),
  userId: z.uuid().optional(),
  order: z.number().optional(),
})

export class UpdateLegitimatorCommitteeMemberController {
  constructor(
    private readonly legitimatorCommitteeMemberRepository: ILegitimatorCommitteeMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id, role, description, userId, order } =
        updateLegitimatorCommitteeMemberSchema.parse({
          id: req.params.id,
          ...req.body,
        })

      const existingMember =
        await this.legitimatorCommitteeMemberRepository.findById(id)

      if (!existingMember) {
        throw new NotFoundError('O membro do comitê legitimador não existe.')
      }

      await this.legitimatorCommitteeMemberRepository.update({
        id,
        role,
        description,
        userId,
        order,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
