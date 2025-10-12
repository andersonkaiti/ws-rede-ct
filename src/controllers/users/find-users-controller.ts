import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'

export class FindUsersController {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(_req: Request, res: Response) {
    try {
      const users = await this.userRepository.find()

      res.status(HttpStatus.OK).json(users)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
