import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IPartnerRepository } from '../../repositories/partner/ipartner-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_LOGO_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_LOGO_SIZE_BYTES = MAX_LOGO_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createPartnerSchema = z.object({
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
  websiteUrl: z.url('URL do site deve ser válida').optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  since: z.coerce.date(),
  isActive: z.preprocess((value) => {
    if (value === 'true') {
      return true
    }

    return false
  }, z.boolean().optional()),
})

export class CreatePartnerController {
  constructor(
    private readonly partnerRepository: IPartnerRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { name, logo, websiteUrl, description, category, since, isActive } =
        createPartnerSchema.parse({
          ...req.body,
          logo: req.file,
        })

      const partner = await this.partnerRepository.create({
        name,
        websiteUrl,
        description,
        category,
        since,
        isActive,
      })

      const logoUrl = await this.firebaseStorageService.uploadFile({
        file: logo,
        id: partner.id,
        folder: FileType.PARTNER,
      })

      await this.partnerRepository.update({
        id: partner.id,
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
