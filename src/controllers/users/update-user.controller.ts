import { UserRole } from '@prisma/client'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'
import type { IBcryptService } from '../../services/auth/bcrypt/ibcryptjs.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_AVATAR_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * MEGABYTE

const updateUserSchema = z.object({
  id: z.uuid(),
  name: z.string().optional(),
  password: z.string().optional(),
  role: z.enum(UserRole).optional(),
  avatarImage: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        (typeof file === 'object' &&
          typeof file.mimetype === 'string' &&
          file.mimetype.startsWith('image/') &&
          typeof file.size === 'number' &&
          file.size <= MAX_AVATAR_SIZE_BYTES),
      {
        message: 'O avatar deve ser uma imagem válida de no máximo 5MB.',
      }
    )
    .optional(),
})

export class UpdateUserController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
    private readonly bcryptService: IBcryptService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = updateUserSchema.safeParse({
        ...req.body,
        avatarImage: req.file,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { id, name, role, password, avatarImage } = parseResult.data

      const authenticatedUserId = req.user.id

      if (authenticatedUserId !== id) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Você não tem permissão para atualizar o usuário.',
        })
      }

      let passwordHash: undefined | string

      if (password) {
        passwordHash = await this.bcryptService.hash(password)
      }

      let avatarUrl: undefined | string

      if (avatarImage) {
        avatarUrl = await this.firebaseStorageService.uploadFile({
          file: avatarImage,
          id,
          folder: File.USER,
        })
      }

      const authenticatedUserRole = req.user.role

      let updatedRole: undefined | UserRole

      if (authenticatedUserRole === UserRole.ADMIN) {
        updatedRole = role
      }

      await this.userRepository.update({
        avatarUrl,
        id,
        name,
        passwordHash,
        role: updatedRole,
      })

      return res.status(HttpStatus.OK).json({
        message: 'Usuário atualizado com sucesso.',
      })
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
