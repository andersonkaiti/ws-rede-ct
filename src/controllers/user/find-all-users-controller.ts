import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'

export class FindAllUsersController {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(_req: Request, res: Response) {
    try {
      const users = await this.userRepository.findAll()

      res.status(HttpStatus.OK).json(users)
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Erro ao buscar usuários' })
      }
    }
  }
}
