import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import { UnauthorizedError } from '../../errors/unauthorized-error.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteUserSchema = z.object({
  id: z.string(),
})

export class DeleteUserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteUserSchema.parse({
        id: req.params.id,
      })

      const user = await this.userRepository.findById(id)

      if (!user) {
        throw new NotFoundError('O usuário não existe.')
      }

      const authenticatedUserId = req.user.id

      if (user.id !== authenticatedUserId) {
        throw new UnauthorizedError(
          'Você não tem permissão para deletar o usuário',
        )
      }

      await this.userRepository.deleteById(user.id)

      return res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
