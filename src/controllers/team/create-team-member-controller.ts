import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { ITeamMemberRepository } from '../../repositories/team-member/iteam-member-repository.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.ts'

extendZodWithOpenApi(z)

export const createTeamMemberSchema = z.object({
  teamId: z.uuid(),
  member: z.object({
    userId: z.uuid(),
    role: z.string(),
    description: z.string(),
  }),
})

export class CreateTeamMemberController {
  constructor(
    private readonly teamMemberRepository: ITeamMemberRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        teamId,
        member: { userId, ...rest },
      } = createTeamMemberSchema.parse({
        ...req.body,
        teamId: req.params.teamId,
      })

      const user = await this.userRepository.findById(userId)

      if (!user) {
        throw new NotFoundError('O usuário não existe.')
      }

      const teamMember = await this.teamMemberRepository.create({
        ...rest,
        userId,
        teamId,
      })

      res.status(HttpStatus.CREATED).json(teamMember)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
