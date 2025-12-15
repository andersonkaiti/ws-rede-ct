import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { ConflictError } from '../../errrors/conflict-error.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.ts'
import type { IBcryptService } from '../../services/auth/bcrypt/ibcryptjs.ts'

const PASSWORD_MIN_LENGTH = 8

extendZodWithOpenApi(z)

export const createUserSchema = z
  .object({
    name: z.string('Nome é obrigatório.').min(1, 'Nome é obrigatório.'),
    emailAddress: z.email('E-mail inválido.').min(1, 'E-mail é obrigatório.'),
    password: z
      .string('A senha é obrigatória.')
      .min(
        PASSWORD_MIN_LENGTH,
        `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`,
      ),
    confirmPassword: z
      .string('A senha é obrigatória.')
      .min(
        PASSWORD_MIN_LENGTH,
        `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`,
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

export class SignUpController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcrypt: IBcryptService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { emailAddress, name, password } = createUserSchema.parse(req.body)

      const userAlreadyExists =
        await this.userRepository.findByEmail(emailAddress)

      if (userAlreadyExists) {
        throw new ConflictError('Usuário já existe.')
      }

      const passwordHash = await this.bcrypt.hash(password)

      await this.userRepository.create({
        name,
        emailAddress,
        passwordHash,
      })

      return res.status(HttpStatus.CREATED).json()
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
