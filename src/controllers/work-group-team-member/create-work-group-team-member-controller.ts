import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IWorkGroupTeamMemberRepository } from '../../repositories/work-group-team-member/iwork-group-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const createWorkGroupTeamMemberSchema = z.object({
  role: z.string().min(1),
  description: z.string().optional(),
  userId: z.uuid(),
})

export class CreateWorkGroupTeamMemberController {
  constructor(
    private readonly workGroupTeamMemberRepository: IWorkGroupTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { role, description, userId } =
        createWorkGroupTeamMemberSchema.parse(req.body)

      await this.workGroupTeamMemberRepository.create({
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
