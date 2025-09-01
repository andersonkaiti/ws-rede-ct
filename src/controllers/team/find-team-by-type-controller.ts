import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.ts'

export class FindTeamByTypeController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { type } = req.params

      const name =
        typeof req.query.name === 'string' ? req.query.name : undefined
      const updated_at =
        typeof req.query.updated_at === 'string'
          ? req.query.updated_at
          : undefined

      const team = await this.teamRepository.findByType({
        type,
        filter: {
          name,
          updated_at,
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
