import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ISDHCTeamMemberRepository } from '../../repositories/sdhc-team-member/isdhc-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const createSDHCTeamMemberSchema = z.object({
  role: z.string().min(1),
  description: z.string().optional(),
  userId: z.uuid(),
})

export class CreateSDHCTeamMemberController {
  constructor(
    private readonly sdhcTeamMemberRepository: ISDHCTeamMemberRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { role, description, userId } = createSDHCTeamMemberSchema.parse(
        req.body
      )

      await this.sdhcTeamMemberRepository.create({
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
