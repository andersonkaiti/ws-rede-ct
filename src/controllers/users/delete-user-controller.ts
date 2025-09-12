import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
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
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'O usuário não existe.',
        })
      }

      const authenticatedUserId = req.user.id

      if (user.id !== authenticatedUserId) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Você não tem permissão para deletar o usuário',
        })
      }

      await this.userRepository.deleteById(user.id)

      return res.status(HttpStatus.NO_CONTENT).json()
    } catch (err) {
      if (err instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
        })
      }
    }
  }
}
