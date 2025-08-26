import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.d.ts'

export class CreateTeamController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { name, type, members } = req.body

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
