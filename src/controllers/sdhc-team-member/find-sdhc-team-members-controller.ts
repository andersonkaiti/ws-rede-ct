import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ISDHCTeamMemberRepository } from '../../repositories/sdhc-team-member/isdhc-team-member-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findSDHCTeamMembersSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  role: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindSDHCTeamMembersController {
  constructor(
    private readonly sdhcTeamMemberRepository: ISDHCTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findSDHCTeamMembersSchema.parse(
      req.query,
    )

    const offset = limit ? limit * page - limit : undefined

    const [members, totalMembers] = await Promise.all([
      this.sdhcTeamMemberRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.sdhcTeamMemberRepository.count({
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
