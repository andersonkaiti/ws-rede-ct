import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.js'

export class FindTeamsController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(_req: Request, res: Response) {
    try {
      const teams = await this.teamRepository.findAll()

      return res.status(HttpStatus.OK).json(teams)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
