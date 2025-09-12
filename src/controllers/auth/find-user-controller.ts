import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.js'

extendZodWithOpenApi(z)

const findAuthenticatedUserControllerSchema = z.object({
  authenticatedUserId: z.uuid(),
})

export class FindAuthenticatedUserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = findAuthenticatedUserControllerSchema.safeParse({
        authenticatedUserId: req.user.id,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const user = await this.userRepository.findById(
        parseResult.data.authenticatedUserId
      )

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Usuário não encontrado.',
        })
      }

      return res.status(HttpStatus.OK).json(user)
    } catch (err) {
      if (err instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
        })
      }
    }
  }
}
