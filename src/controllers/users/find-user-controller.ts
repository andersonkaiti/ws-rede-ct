import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { UserRepository } from '../../repositories/user/user-repository.ts'

extendZodWithOpenApi(z)

export const paramsSchema = z.object({
  id: z.string().min(1, 'id do usuário não fornecido.'),
})

export class FindUserController {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = paramsSchema.parse(req.params)

      const user = await this.userRepository.findById(id)

      if (!user) {
        throw new NotFoundError('Usuário não encontrado')
      }

      res.status(HttpStatus.OK).json(user)
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
