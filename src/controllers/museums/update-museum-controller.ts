import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IMuseumRepository } from '../../repositories/museum/imuseum-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updateMuseumSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  logo: z
    .any()
    .refine((file) =>
      validateImageFile({
        file,
        optional: true,
      }),
    )
    .optional(),
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

export class UpdateMuseumController {
  constructor(
    private readonly museumRepository: IMuseumRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
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
  }
}
