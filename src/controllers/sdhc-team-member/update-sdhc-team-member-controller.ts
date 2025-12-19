import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ISDHCTeamMemberRepository } from '../../repositories/sdhc-team-member/isdhc-team-member-repository.d.ts'

extendZodWithOpenApi(z)

export const updateSDHCTeamMemberSchema = z.object({
  id: z.uuid(),
  role: z.string().min(1).optional(),
  description: z.string().optional(),
  userId: z.uuid().optional(),
  order: z.number().optional(),
})

export class UpdateSDHCTeamMemberController {
  constructor(
    private readonly sdhcTeamMemberRepository: ISDHCTeamMemberRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, role, description, userId, order } =
      updateSDHCTeamMemberSchema.parse({
        id: req.params.id,
        ...req.body,
      })

    const existingMember = await this.sdhcTeamMemberRepository.findById(id)

    if (!existingMember) {
      throw new NotFoundError('O membro da equipe SDHC não existe.')
    }

    await this.sdhcTeamMemberRepository.update({
      id,
      role,
      description,
      userId,
      order,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
