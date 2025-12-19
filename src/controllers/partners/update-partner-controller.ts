import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IPartnerRepository } from '../../repositories/partner/ipartner-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_LOGO_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_LOGO_SIZE_BYTES = MAX_LOGO_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updatePartnerSchema = z.object({
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
  websiteUrl: z.url('URL do site deve ser válida').optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  since: z.coerce.date().optional(),
  isActive: z.preprocess((value) => {
    if (value === 'true') {
      return true
    }

    return false
  }, z.boolean().optional()),
})

export class UpdatePartnerController {
  constructor(
    private readonly partnerRepository: IPartnerRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      name,
      logo,
      websiteUrl,
      description,
      category,
      since,
      isActive,
    } = updatePartnerSchema.parse({
      id: req.params.id,
      ...req.body,
      logo: req.file,
    })

    const existingPartner = await this.partnerRepository.findById(id)

    if (!existingPartner) {
      throw new NotFoundError('O parceiro não existe.')
    }

    let logoUrl = existingPartner.logoUrl

    if (logo) {
      logoUrl = await this.firebaseStorageService.uploadFile({
        file: logo,
        id,
        folder: 'images/partners',
      })
    }

    if (!logoUrl) {
      throw new InternalServerError('Logo URL é obrigatório')
    }

    await this.partnerRepository.update({
      id,
      name,
      logoUrl,
      websiteUrl,
      description,
      category,
      since,
      isActive,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
