import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import type { IMuseumRepository } from '../../repositories/museum/imuseum-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const createMuseumSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  logo: z.any().refine((file) =>
    validateImageFile({
      file,
    }),
  ),
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
      folder: PATHS.MUSEUM,
    })

    await this.museumRepository.update({
      id: museum.id,
      logoUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
