import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { ISDHCTeamMemberRepository } from '../../repositories/sdhc-team-member/isdhc-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const findSDHCTeamMembersSchema = z.object({
  role: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).optional(),
})

export class FindSDHCTeamMembersController {
  constructor(
    private readonly sdhcTeamMemberRepository: ISDHCTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const filter = findSDHCTeamMembersSchema.parse(req.query)

      const members = await this.sdhcTeamMemberRepository.find({
        filter,
      })

      res.status(HttpStatus.OK).json({
        members,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
