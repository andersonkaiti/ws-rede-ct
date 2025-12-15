import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IReferenceCenterTeamMemberRepository } from '../../repositories/reference-center-team-member/ireference-center-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const createReferenceCenterTeamMemberSchema = z.object({
  role: z.string().min(1),
  description: z.string().optional(),
  userId: z.uuid(),
})

export class CreateReferenceCenterTeamMemberController {
  constructor(
    private readonly referenceCenterTeamMemberRepository: IReferenceCenterTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { role, description, userId } =
        createReferenceCenterTeamMemberSchema.parse(req.body)

      await this.referenceCenterTeamMemberRepository.create({
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
