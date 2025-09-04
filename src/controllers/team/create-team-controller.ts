import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.d.ts'

const createTeamSchema = z.object({
  type: z.string().min(1),
  name: z.string().min(1),
  members: z.array(
    z.object({
      role: z.string(),
      user: z.object({
        id: z.string(),
        first_name: z.string(),
        last_name: z.string().optional(),
      }),
    })
  ),
})

export class CreateTeamController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      console.log(req.body.members)

      const parseResult = createTeamSchema.safeParse(req.body)

      console.log(parseResult.data)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.treeifyError(parseResult.error),
        })
      }

      const { name, type, members } = parseResult.data

      const team = await this.teamRepository.create({
        name,
        type,
        members,
      })

      res.status(HttpStatus.CREATED).json(team)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message,
        })
      }
    }
  }
}
