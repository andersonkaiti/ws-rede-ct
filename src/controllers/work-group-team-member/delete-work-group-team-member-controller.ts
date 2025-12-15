import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IWorkGroupTeamMemberRepository } from '../../repositories/work-group-team-member/iwork-group-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteWorkGroupTeamMemberSchema = z.object({
  id: z.uuid(),
})

export class DeleteWorkGroupTeamMemberController {
  constructor(
    private readonly workGroupTeamMemberRepository: IWorkGroupTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteWorkGroupTeamMemberSchema.parse({
        id: req.params.id,
      })

      const existingMember =
        await this.workGroupTeamMemberRepository.findById(id)

      if (!existingMember) {
        throw new NotFoundError('O membro do grupo de trabalho não existe.')
      }

      await this.workGroupTeamMemberRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
