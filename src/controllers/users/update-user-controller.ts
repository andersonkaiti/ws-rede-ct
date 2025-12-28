import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { BadRequestError } from '../../errors/bad-request-error.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'
import { validateImageFile } from '../../utils/validate-file.ts'

const ORCID_REGEX = /^\d{4}-\d{4}-\d{4}-\d{4}$/

const PHONE_REGEX = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/

extendZodWithOpenApi(z)

export const updateUserSchema = z.object({
  name: z.string().optional(),
  lattesUrl: z.string().optional(),
  orcid: z
    .union([
      z
        .string()
        .regex(
          ORCID_REGEX,
          'ORCID inválido. Deve estar no formato 0000-0000-0000-0000',
        ),
      z.literal(''),
    ])
    .optional(),
  phone: z
    .union([
      z
        .string()
        .regex(
          PHONE_REGEX,
          'Telefone inválido. Deve estar no formato (99) 99999-9999',
        ),
      z.literal(''),
    ])
    .optional(),
  avatarImage: z
    .any()
    .refine((file) =>
      validateImageFile({
        file,
        optional: true,
      }),
    )
    .optional(),
  removeAvatarImage: z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .transform((val) => val === true || val === 'true')
    .optional(),
})

export class UpdateUserController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { avatarImage, removeAvatarImage, ...rest } = updateUserSchema.parse({
      ...req.body,
      avatarImage: req.file,
    })

    const authenticatedUserId = req.user.id

    const user = await this.userRepository.findById(authenticatedUserId)

    if (!user) {
      throw new BadRequestError('O usuário não existe')
    }

    let avatarUrl = user.avatarUrl

    if (avatarImage) {
      if (user.avatarUrl) {
        avatarUrl = await this.firebaseStorageService.updateFile({
          file: avatarImage,
          id: authenticatedUserId,
          folder: PATHS.USER,
          fileUrl: user.avatarUrl,
        })
      } else {
        avatarUrl = await this.firebaseStorageService.uploadFile({
          file: avatarImage,
          id: authenticatedUserId,
          folder: PATHS.USER,
        })
      }
    }

    if (removeAvatarImage) {
      if (user.avatarUrl) {
        await this.firebaseStorageService.deleteFile({
          fileUrl: user.avatarUrl,
        })
      }
    }

    await this.userRepository.update({
      ...rest,
      id: authenticatedUserId,
      avatarUrl: removeAvatarImage ? undefined : avatarUrl,
    })

    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
