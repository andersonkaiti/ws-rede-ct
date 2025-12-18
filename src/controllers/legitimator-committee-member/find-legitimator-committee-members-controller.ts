import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ILegitimatorCommitteeMemberRepository } from '../../repositories/legitimator-committee-member/ilegitimator-committee-member-repository.d.ts'

extendZodWithOpenApi(z)

export const findLegitimatorCommitteeMembersSchema = z.object({
  role: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindLegitimatorCommitteeMembersController {
  constructor(
    private readonly legitimatorCommitteeMemberRepository: ILegitimatorCommitteeMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const filter = findLegitimatorCommitteeMembersSchema.parse(req.query)

    const members = await this.legitimatorCommitteeMemberRepository.find({
      filter,
    })

    res.status(HttpStatus.OK).json({
      members,
    })
  }
}
