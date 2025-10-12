import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.js'

extendZodWithOpenApi(z)

const findAuthenticatedUserControllerSchema = z.object({
  authenticatedUserId: z.uuid(),
})

export class FindAuthenticatedUserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { authenticatedUserId } =
        findAuthenticatedUserControllerSchema.parse({
          authenticatedUserId: req.user.id,
        })

      const user = await this.userRepository.findById(authenticatedUserId)

      if (!user) {
        throw new NotFoundError('Usuário não encontrado.')
      }

      return res.status(HttpStatus.OK).json(user)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
