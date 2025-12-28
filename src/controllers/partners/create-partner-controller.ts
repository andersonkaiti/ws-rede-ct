import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import type { IPartnerRepository } from '../../repositories/partner/ipartner-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const createPartnerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  logo: z.any().refine((file) =>
    validateImageFile({
      file,
    }),
  ),
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
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
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
      folder: PATHS.PARTNER,
    })

    await this.partnerRepository.update({
      id: partner.id,
      logoUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
