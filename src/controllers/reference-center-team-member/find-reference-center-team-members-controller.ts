import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IReferenceCenterTeamMemberRepository } from '../../repositories/reference-center-team-member/ireference-center-team-member-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findReferenceCenterTeamMembersSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  role: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindReferenceCenterTeamMembersController {
  constructor(
    private readonly referenceCenterTeamMemberRepository: IReferenceCenterTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } =
      findReferenceCenterTeamMembersSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [members, totalMembers] = await Promise.all([
      this.referenceCenterTeamMemberRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.referenceCenterTeamMemberRepository.count({
        filter,
      }),
    ])

    const totalPages = limit ? Math.max(Math.ceil(totalMembers / limit), 1) : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      members,
    })
  }
}
