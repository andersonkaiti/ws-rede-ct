import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.ts'
import type { IBcryptService } from '../../services/auth/bcrypt/ibcryptjs.ts'
import type { IJWTService } from '../../services/auth/jwt/ijwt.ts'

const signInSchema = z.object({
  password: z.string(),
  email: z.email(),
})

export class SignInController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcrypt: IBcryptService,
    private readonly jwtService: IJWTService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = signInSchema.safeParse(req.body)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { email, password } = parseResult.data

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
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Senha inválida.',
        })
      }

      const { id, role } = user

      const token = this.jwtService.sign({
        id,
        role,
        email,
      })

      return res.status(HttpStatus.OK).json({ token })
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: err.message,
        })
      }
    }
  }
}
