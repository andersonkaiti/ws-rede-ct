import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegionalCongressPartnerRepository } from '../../repositories/regional-congress/partner/iregional-congress-partner-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updateRegionalCongressPartnerSchema = z.object({
  id: z.uuid('ID inválido'),
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
})

export class UpdateRegionalCongressPartnerController {
  constructor(
    private readonly regionalCongressPartnerRepository: IRegionalCongressPartnerRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, name, logo } = updateRegionalCongressPartnerSchema.parse({
      ...req.params,
      ...req.body,
      logo: req.file,
    })

    const existingPartner =
      await this.regionalCongressPartnerRepository.findById(id)

    if (!existingPartner) {
      throw new NotFoundError('Parceiro não encontrado')
    }

    let logoUrl: string | undefined

    if (logo) {
      logoUrl = await this.firebaseStorageService.uploadFile({
        file: logo,
        id,
        folder: PATHS.PARTNER,
      })
    }

    await this.regionalCongressPartnerRepository.update({
      id,
      name,
      ...(logoUrl && { logoUrl }),
    })

    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
