import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IReferenceCenterTeamMemberRepository } from '../../repositories/reference-center-team-member/ireference-center-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const findReferenceCenterTeamMemberByIdSchema = z.object({
  id: z.uuid(),
})

export class FindReferenceCenterTeamMemberByIdController {
  constructor(
    private readonly referenceCenterTeamMemberRepository: IReferenceCenterTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findReferenceCenterTeamMemberByIdSchema.parse({
        id: req.params.id,
      })

      const member = await this.referenceCenterTeamMemberRepository.findById(id)

      if (!member) {
        throw new NotFoundError('O membro do centro de referência não existe.')
      }

      return res.status(HttpStatus.OK).json(member)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
