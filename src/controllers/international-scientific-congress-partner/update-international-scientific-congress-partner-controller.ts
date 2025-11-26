import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInternationalScientificCongressPartnerRepository } from '../../repositories/international-scientific-congress/partner/international-scientific-congress-gallery-repository-partner-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_LOGO_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_LOGO_SIZE_BYTES = MAX_LOGO_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateInternationalScientificCongressPartnerSchema = z.object({
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
})

export class UpdateInternationalScientificCongressPartnerController {
  constructor(
    private readonly internationalScientificCongressPartnerRepository: IInternationalScientificCongressPartnerRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id, name, logo } =
        updateInternationalScientificCongressPartnerSchema.parse({
          id: req.params.id,
          ...req.body,
          logo: req.file,
        })

      const existingPartner =
        await this.internationalScientificCongressPartnerRepository.findById(id)

      if (!existingPartner) {
        throw new NotFoundError('O parceiro não existe.')
      }

      let logoUrl = existingPartner.logoUrl

      if (logo) {
        logoUrl = await this.firebaseStorageService.uploadFile({
          file: logo,
          id,
          folder: FileType.PARTNER,
        })
      }

      await this.internationalScientificCongressPartnerRepository.update({
        id,
        name,
        logoUrl: logoUrl ?? undefined,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
