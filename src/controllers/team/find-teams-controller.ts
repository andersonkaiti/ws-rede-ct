import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.js'

export class FindTeamsController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(_req: Request, res: Response) {
    try {
      const teams = await this.teamRepository.findAll()

      return res.status(HttpStatus.OK).json(teams)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        })
      }
    }
  }
}
