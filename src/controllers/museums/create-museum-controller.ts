import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IMuseumRepository } from '../../repositories/museum/imuseum-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_LOGO_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_LOGO_SIZE_BYTES = MAX_LOGO_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createMuseumSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  logo: z.any().refine((value) => {
    if (value === undefined || value === null) {
      return false
    }

    if (typeof value !== 'object' || typeof value.size !== 'number') {
      return false
    }

    return value.size <= MAX_LOGO_SIZE_BYTES
  }, `A imagem deve ter no máximo ${MAX_LOGO_SIZE_MB}MB.`),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  description: z.string().optional(),
  website: z.url('URL do site deve ser válida').optional(),
  email: z.email('Email deve ser válido').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  functioning: z.string().optional(),
})

export class CreateMuseumController {
  constructor(
    private readonly museumRepository: IMuseumRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        name,
        logo,
        city,
        state,
        country,
        description,
        website,
        email,
        phone,
        address,
        functioning,
      } = createMuseumSchema.parse({
        ...req.body,
        logo: req.file,
      })

      const museum = await this.museumRepository.create({
        name,
        city,
        state,
        country,
        description,
        website,
        email,
        phone,
        address,
        functioning,
      })

      const logoUrl = await this.firebaseStorageService.uploadFile({
        file: logo,
        id: museum.id,
        folder: FileType.MUSEUM,
      })

      await this.museumRepository.update({
        id: museum.id,
        logoUrl,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
