import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_AVATAR_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * MEGABYTE

const ORCID_REGEX = /^\d{4}-\d{4}-\d{4}-\d{4}$/

const NO_NUMBER_REGEX = /^[^0-9]*$/
const PHONE_REGEX = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/

extendZodWithOpenApi(z)

export const updateUserSchema = z.object({
  name: z.string().optional(),
  lattesUrl: z.string().optional(),
  orcid: z
    .string()
    .transform((val) => val.trim())
    .transform((val) => (NO_NUMBER_REGEX.test(val) ? '' : val))
    .refine((val) => NO_NUMBER_REGEX.test(val) || ORCID_REGEX.test(val), {
      message: 'ORCID inválido. Deve estar no formato 0000-0000-0000-0000',
    }),
  phone: z
    .string()
    .transform((val) => (NO_NUMBER_REGEX.test(val) ? '' : val))
    .refine((val) => NO_NUMBER_REGEX.test(val) || PHONE_REGEX.test(val), {
      message: 'Telefone inválido. Deve estar no formato (99) 99999-9999',
    }),
  avatarImage: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_AVATAR_SIZE_BYTES
    }, `A imagem deve ter no máximo ${MAX_AVATAR_SIZE_MB}MB.`)
    .optional(),
})

export class UpdateUserController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
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

      const { avatarImage, ...rest } = parseResult.data

      const authenticatedUserId = req.user.id

      const user = await this.userRepository.findById(authenticatedUserId)

      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'O usuário não existe',
        })
      }

      let avatarUrl = user.avatarUrl

      if (avatarImage) {
        if (user.avatarUrl) {
          avatarUrl = await this.firebaseStorageService.updateFile({
            file: avatarImage,
            id: authenticatedUserId,
            folder: FileType.USER,
            fileUrl: user.avatarUrl,
          })
        } else {
          avatarUrl = await this.firebaseStorageService.uploadFile({
            file: avatarImage,
            id: authenticatedUserId,
            folder: FileType.USER,
          })
        }
      }

      await this.userRepository.update({
        ...rest,
        id: authenticatedUserId,
        avatarUrl: avatarUrl || undefined,
      })

      return res.status(HttpStatus.NO_CONTENT).json()
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
        })
      }
    }
  }
}
