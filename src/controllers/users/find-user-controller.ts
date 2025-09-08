import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'

const paramsSchema = z.object({
  id: z.string().min(1, 'id do usuário não fornecido.'),
})

export class FindUserController {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = paramsSchema.safeParse(req.params)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.treeifyError(parseResult.error),
        })
      }

      const { id } = parseResult.data

      const user = await this.userRepository.findById(id)

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Usuário não encontrado',
        })
      }

      res.status(HttpStatus.OK).json(user)
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Erro ao buscar usuário',
        })
      }
    }
  }
}
