import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IWorkGroupTeamMemberRepository } from '../../repositories/work-group-team-member/iwork-group-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const updateWorkGroupTeamMemberSchema = z.object({
  id: z.uuid(),
  role: z.string().min(1).optional(),
  description: z.string().optional(),
  userId: z.uuid().optional(),
})

export class UpdateWorkGroupTeamMemberController {
  constructor(
    private readonly workGroupTeamMemberRepository: IWorkGroupTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id, role, description, userId } =
        updateWorkGroupTeamMemberSchema.parse({
          id: req.params.id,
          ...req.body,
        })

      const existingMember =
        await this.workGroupTeamMemberRepository.findById(id)

      if (!existingMember) {
        throw new NotFoundError('O membro do grupo de trabalho não existe.')
      }

      await this.workGroupTeamMemberRepository.update({
        id,
        role,
        description,
        userId,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
