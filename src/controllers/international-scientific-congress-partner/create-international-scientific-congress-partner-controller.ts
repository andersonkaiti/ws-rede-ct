import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/iinternational-scientific-congress-repository.d.ts'
import type { IInternationalScientificCongressPartnerRepository } from '../../repositories/international-scientific-congress/partner/international-scientific-congress-gallery-repository-partner-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const createInternationalScientificCongressPartnerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  logo: z.any().refine((file) =>
    validateImageFile({
      file,
    }),
  ),
  id: z.uuid(),
})

export class CreateInternationalScientificCongressPartnerController {
  constructor(
    private readonly internationalScientificCongressPartnerRepository: IInternationalScientificCongressPartnerRepository,
    private readonly internationalScientificCongressRepository: IInternationalScientificCongressRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { name, logo, id } =
      createInternationalScientificCongressPartnerSchema.parse({
        ...req.body,
        ...req.params,
        logo: req.file,
      })

    const existingCongress =
      await this.internationalScientificCongressRepository.findById(id)

    if (!existingCongress) {
      throw new NotFoundError('O congresso não existe.')
    }

    const partner =
      await this.internationalScientificCongressPartnerRepository.create({
        name,
        congressId: id,
      })

    let logoUrl: string | undefined

    if (logo) {
      logoUrl = await this.firebaseStorageService.uploadFile({
        file: logo,
        id: partner.id,
        folder: PATHS.PARTNER,
      })

      await this.internationalScientificCongressPartnerRepository.update({
        id: partner.id,
        logoUrl,
      })
    }

    return res.sendStatus(HttpStatus.CREATED)
  }
}
