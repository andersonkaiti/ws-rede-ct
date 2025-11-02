import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ILegitimatorCommitteeMemberRepository } from '../../repositories/legitimator-committee-member/ilegitimator-committee-member-repository.d.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

extendZodWithOpenApi(z)

export const findLegitimatorCommitteeMembersSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().min(1).default(DEFAULT_LIMIT),
  role: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindLegitimatorCommitteeMembersController {
  constructor(
    private readonly legitimatorCommitteeMemberRepository: ILegitimatorCommitteeMemberRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, ...filter } =
        findLegitimatorCommitteeMembersSchema.parse(req.query)

      const offset = limit * page - limit

      const [members, totalMembers] = await Promise.all([
        this.legitimatorCommitteeMemberRepository.find({
          pagination: {
            offset,
            limit,
          },
          filter,
        }),
        this.legitimatorCommitteeMemberRepository.count({
          filter,
        }),
      ])

      const totalPages = Math.max(Math.ceil(totalMembers / limit), 1)

      res.status(HttpStatus.OK).json({
        page,
        totalPages,
        offset,
        limit,
        members,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
