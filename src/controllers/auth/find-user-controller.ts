import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.js'

export class FindAuthenticatedUserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const authenticatedUserId = req.user.id

      const user = await this.userRepository.findById(authenticatedUserId)

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Usuário não encontrado.',
        })
      }

      return res.status(HttpStatus.OK).json(user)
    } catch (err) {
      if (err instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: err.message,
        })
      }
    }
  }
}
