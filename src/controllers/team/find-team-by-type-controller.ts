import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.ts'

const findTeamsByTypeSchema = z.object({
  type: z.string(),
  name: z.string().optional(),
})

export class FindTeamByTypeController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { type, name } = findTeamsByTypeSchema.parse({
        type: req.params.type,
        name: req.query.name,
      })

      const team = await this.teamRepository.findByType({
        type,
        filter: {
          name,
        },
      })

      res.status(HttpStatus.OK).json(team)
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
