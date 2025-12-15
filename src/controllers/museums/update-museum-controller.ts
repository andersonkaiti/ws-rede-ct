import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IMuseumRepository } from '../../repositories/museum/imuseum-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_LOGO_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_LOGO_SIZE_BYTES = MAX_LOGO_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateMuseumSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  logo: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_LOGO_SIZE_BYTES
    }, `A imagem deve ter no máximo ${MAX_LOGO_SIZE_MB}MB.`)
    .optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  description: z.string().optional(),
  website: z.url('URL do site deve ser válida').optional(),
  email: z.string().email('Email deve ser válido').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  functioning: z.string().optional(),
})

export class UpdateMuseumController {
  constructor(
    private readonly museumRepository: IMuseumRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id,
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
      } = updateMuseumSchema.parse({
        id: req.params.id,
        ...req.body,
        logo: req.file,
      })

      const existingMuseum = await this.museumRepository.findById(id)

      if (!existingMuseum) {
        throw new NotFoundError('O museu não existe.')
      }

      let logoUrl = existingMuseum.logoUrl

      if (logo) {
        logoUrl = await this.firebaseStorageService.uploadFile({
          file: logo,
          id,
          folder: 'images/museums',
        })
      }

      if (!logoUrl) {
        throw new InternalServerError('Logo URL é obrigatório')
      }

      await this.museumRepository.update({
        id,
        name,
        logoUrl,
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

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
