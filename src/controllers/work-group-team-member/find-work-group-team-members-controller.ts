import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IWorkGroupTeamMemberRepository } from '../../repositories/work-group-team-member/iwork-group-team-member-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findWorkGroupTeamMembersSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  role: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindWorkGroupTeamMembersController {
  constructor(
    private readonly workGroupTeamMemberRepository: IWorkGroupTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } = findWorkGroupTeamMembersSchema.parse(
      req.query,
    )

    const offset = limit ? limit * page - limit : undefined

    const [members, totalMembers] = await Promise.all([
      this.workGroupTeamMemberRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.workGroupTeamMemberRepository.count({
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
