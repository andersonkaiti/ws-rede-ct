import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { BadRequestError } from '../../errors/bad-request-error.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'

extendZodWithOpenApi(z)

export const promoteUserSchema = z.object({
  id: z.uuid(),
})

export class PromoteUserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = promoteUserSchema.parse({
        ...req.params,
      })

      const user = await this.userRepository.findById(id)

      if (!user) {
        throw new BadRequestError('O usuário não existe')
      }

      if (user.role !== 'USER') {
        throw new BadRequestError('O usuário não é um usuário comum')
      }

      await this.userRepository.update({
        id,
        role: 'ADMIN',
      })

      return res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
