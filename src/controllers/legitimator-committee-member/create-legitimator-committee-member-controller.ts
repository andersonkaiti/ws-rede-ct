import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ILegitimatorCommitteeMemberRepository } from '../../repositories/legitimator-committee-member/ilegitimator-committee-member-repository.d.ts'

extendZodWithOpenApi(z)

export const createLegitimatorCommitteeMemberSchema = z.object({
  role: z.string().min(1),
  description: z.string().optional(),
  userId: z.uuid(),
})

export class CreateLegitimatorCommitteeMemberController {
  constructor(
    private readonly legitimatorCommitteeMemberRepository: ILegitimatorCommitteeMemberRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { role, description, userId } =
        createLegitimatorCommitteeMemberSchema.parse(req.body)

      await this.legitimatorCommitteeMemberRepository.create({
        role,
        description,
        userId,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
