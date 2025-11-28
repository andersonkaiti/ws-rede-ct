import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File as FileType } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IRegionalCongressRepository } from '../../repositories/regional-congress/iregional-congress-repository.d.ts'
import type { IRegionalCongressPartnerRepository } from '../../repositories/regional-congress/partner/iregional-congress-partner-repository.js'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_LOGO_SIZE_MB = 2
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_LOGO_SIZE_BYTES = MAX_LOGO_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createRegionalCongressPartnerSchema = z.object({
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
  congressId: z.uuid(),
})

export class CreateRegionalCongressPartnerController {
  constructor(
    private readonly regionalCongressPartnerRepository: IRegionalCongressPartnerRepository,
    private readonly regionalCongressRepository: IRegionalCongressRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { name, logo, congressId } =
        createRegionalCongressPartnerSchema.parse({
          ...req.body,
          ...req.params,
          logo: req.file,
        })

      const existingCongress =
        await this.regionalCongressRepository.findById(congressId)

      if (!existingCongress) {
        throw new NotFoundError('O congresso não existe.')
      }

      const partner = await this.regionalCongressPartnerRepository.create({
        name,
        congressId,
      })

      let logoUrl: string | undefined

      if (logo) {
        logoUrl = await this.firebaseStorageService.uploadFile({
          file: logo,
          id: partner.id,
          folder: FileType.PARTNER,
        })

        await this.regionalCongressPartnerRepository.update({
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
