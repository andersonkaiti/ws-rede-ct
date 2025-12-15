import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/iinternational-scientific-congress-repository.d.ts'
import type { IInternationalScientificCongressPartnerRepository } from '../../repositories/international-scientific-congress/partner/international-scientific-congress-gallery-repository-partner-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_LOGO_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_LOGO_SIZE_BYTES = MAX_LOGO_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createInternationalScientificCongressPartnerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
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
  id: z.uuid(),
})

export class CreateInternationalScientificCongressPartnerController {
  constructor(
    private readonly internationalScientificCongressPartnerRepository: IInternationalScientificCongressPartnerRepository,
    private readonly internationalScientificCongressRepository: IInternationalScientificCongressRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
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
          folder: FileType.PARTNER,
        })

        await this.internationalScientificCongressPartnerRepository.update({
          id: partner.id,
          logoUrl,
        })
      }

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
