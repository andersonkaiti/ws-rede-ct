import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { UnauthorizedError } from '../../errrors/unauthorized-error.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.ts'
import type { IBcryptService } from '../../services/auth/bcrypt/ibcryptjs.ts'
import type { IJWTService } from '../../services/auth/jwt/ijwt.ts'

extendZodWithOpenApi(z)

export const signInSchema = z.object({
  password: z.string(),
  email: z.email(),
})

export class SignInController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcrypt: IBcryptService,
    private readonly jwtService: IJWTService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { email, password } = signInSchema.parse(req.body)

      const user = await this.userRepository.findByEmail(email)

      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Usuário não existe.',
        })
      }

      const isPasswordValid = await this.bcrypt.compare({
        password,
        hashedPassword: user.passwordHash,
      })

      if (!isPasswordValid) {
        throw new UnauthorizedError('Senha inválida.')
      }

      const { id, role } = user

      const token = this.jwtService.sign({
        id,
        role,
        email,
      })

      return res.status(HttpStatus.OK).json({
        token,
      })
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
