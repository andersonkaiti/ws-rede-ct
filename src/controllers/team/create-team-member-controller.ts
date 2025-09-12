import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
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
      const parseResult = createTeamMemberSchema.safeParse({
        ...req.body,
        teamId: req.params.teamId,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const {
        teamId,
        member: { userId, ...rest },
      } = parseResult.data

      const user = await this.userRepository.findById(userId)

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'O usuário não existe.',
        })
      }

      const teamMember = await this.teamMemberRepository.create({
        ...rest,
        userId,
        teamId,
      })

      res.status(HttpStatus.CREATED).json(teamMember)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        })
      }
    }
  }
}
