import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { InMemoriamRole } from '../../../config/database/generated/enums.ts'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IInMemoriamRepository } from '../../repositories/in-memoriam/iin-memoriam-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_PHOTO_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_PHOTO_SIZE_BYTES = MAX_PHOTO_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateInMemoriamSchema = z
  .object({
    id: z.uuid(),
    name: z.string().min(1, 'Nome é obrigatório').optional(),
    birthDate: z.coerce.date().optional(),
    deathDate: z.coerce.date().optional(),
    biography: z.string().optional(),
    photo: z
      .any()
      .refine((value) => {
        if (value === undefined || value === null) {
          return true
        }

        if (typeof value !== 'object' || typeof value.size !== 'number') {
          return false
        }

        return value.size <= MAX_PHOTO_SIZE_BYTES
      }, `A imagem deve ter no máximo ${MAX_PHOTO_SIZE_MB}MB.`)
      .optional(),
    role: z.enum(InMemoriamRole).optional(),
  })
  .refine(
    (data) => {
      if (data.birthDate && data.deathDate) {
        return data.deathDate > data.birthDate
      }
      return true
    },
    {
      message: 'Data de falecimento deve ser posterior à data de nascimento',
      path: ['deathDate'],
    },
  )

export class UpdateInMemoriamController {
  constructor(
    private readonly inMemoriamRepository: IInMemoriamRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id, name, birthDate, deathDate, biography, photo, role } =
        updateInMemoriamSchema.parse({
          id: req.params.id,
          ...req.body,
          photo: req.file,
        })

      const existingInMemoriam = await this.inMemoriamRepository.findById(id)

      if (!existingInMemoriam) {
        throw new NotFoundError('O registro in memoriam não existe.')
      }

      let photoUrl = existingInMemoriam.photoUrl

      if (photo) {
        photoUrl = await this.firebaseStorageService.uploadFile({
          file: photo,
          id,
          folder: FileType.IN_MEMORIAM,
        })
      }

      await this.inMemoriamRepository.update({
        id,
        name,
        birthDate,
        deathDate,
        biography,
        photoUrl: photoUrl ?? undefined,
        role,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
