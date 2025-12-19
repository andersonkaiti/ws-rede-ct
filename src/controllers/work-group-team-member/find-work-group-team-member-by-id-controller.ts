import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IWorkGroupTeamMemberRepository } from '../../repositories/work-group-team-member/iwork-group-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const findWorkGroupTeamMemberByIdSchema = z.object({
  id: z.uuid(),
})

export class FindWorkGroupTeamMemberByIdController {
  constructor(
    private readonly workGroupTeamMemberRepository: IWorkGroupTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = findWorkGroupTeamMemberByIdSchema.parse({
      id: req.params.id,
    })

    const member = await this.workGroupTeamMemberRepository.findById(id)

    if (!member) {
      throw new NotFoundError('O membro do grupo de trabalho não existe.')
    }

    return res.status(HttpStatus.OK).json(member)
  }
}
