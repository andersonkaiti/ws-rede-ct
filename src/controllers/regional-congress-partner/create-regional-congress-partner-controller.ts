import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegionalCongressRepository } from '../../repositories/regional-congress/iregional-congress-repository.d.ts'
import type { IRegionalCongressPartnerRepository } from '../../repositories/regional-congress/partner/iregional-congress-partner-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const createRegionalCongressPartnerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  logo: z
    .any()
    .refine((file) =>
      validateImageFile({
        file,
      }),
    )
    .optional(),
  id: z.uuid(),
})

export class CreateRegionalCongressPartnerController {
  constructor(
    private readonly regionalCongressPartnerRepository: IRegionalCongressPartnerRepository,
    private readonly regionalCongressRepository: IRegionalCongressRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { name, logo, id } = createRegionalCongressPartnerSchema.parse({
      ...req.body,
      ...req.params,
      logo: req.file,
    })

    const existingCongress = await this.regionalCongressRepository.findById(id)

    if (!existingCongress) {
      throw new NotFoundError('O congresso não existe.')
    }

    const partner = await this.regionalCongressPartnerRepository.create({
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

      await this.regionalCongressPartnerRepository.update({
        id: partner.id,
        logoUrl,
      })
    }

    return res.sendStatus(HttpStatus.CREATED)
  }
}
