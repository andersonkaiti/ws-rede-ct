import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { InMemoriamRole } from '../../../config/database/generated/enums.ts'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IInMemoriamRepository } from '../../repositories/in-memoriam/iin-memoriam-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_PHOTO_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_PHOTO_SIZE_BYTES = MAX_PHOTO_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createInMemoriamSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    birthDate: z.coerce.date(),
    deathDate: z.coerce.date(),
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
    role: z.enum(InMemoriamRole),
  })
  .refine((data) => data.deathDate > data.birthDate, {
    message: 'Data de falecimento deve ser posterior à data de nascimento',
    path: ['deathDate'],
  })

export class CreateInMemoriamController {
  constructor(
    private readonly inMemoriamRepository: IInMemoriamRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { name, birthDate, deathDate, biography, role, photo } =
      createInMemoriamSchema.parse({
        ...req.body,
        photo: req.file,
      })

    const InMemoriam = await this.inMemoriamRepository.create({
      name,
      birthDate,
      deathDate,
      biography: biography ?? undefined,
      role,
    })

    let photoUrl: string | undefined

    if (photo) {
      photoUrl = await this.firebaseStorageService.uploadFile({
        file: photo,
        id: InMemoriam.id,
        folder: FileType.IN_MEMORIAM,
      })

      await this.inMemoriamRepository.update({
        id: InMemoriam.id,
        photoUrl,
      })
    }

    return res.sendStatus(HttpStatus.CREATED)
  }
}
