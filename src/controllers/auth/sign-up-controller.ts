import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.ts'
import type { IBcryptService } from '../../services/auth/bcrypt/ibcryptjs.ts'

const PASSWORD_MIN_LENGTH = 8

const createUserSchema = z
  .object({
    name: z.string('Nome é obrigatório.').min(1, 'Nome é obrigatório.'),
    email: z.email('E-mail inválido.').min(1, 'E-mail é obrigatório.'),
    password: z
      .string('A senha é obrigatória.')
      .min(
        PASSWORD_MIN_LENGTH,
        `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`
      ),
    confirmPassword: z
      .string('A senha é obrigatória.')
      .min(
        PASSWORD_MIN_LENGTH,
        `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

export class SignUpController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcrypt: IBcryptService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = createUserSchema.safeParse(req.body)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { email: emailAddress, name, password } = parseResult.data

      const userAlreadyExists =
        await this.userRepository.findByEmail(emailAddress)

      if (userAlreadyExists) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Usuário já existe.',
        })
      }

      const passwordHash = await this.bcrypt.hash(password)

      await this.userRepository.create({
        name,
        emailAddress,
        passwordHash,
      })

      return res.status(HttpStatus.CREATED).json({
        message: 'Usuário criado com sucesso.',
      })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: err.message,
        })
      }
    }
  }
}
