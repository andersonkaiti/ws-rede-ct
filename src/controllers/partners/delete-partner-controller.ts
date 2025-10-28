import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IPartnerRepository } from '../../repositories/partner/ipartner-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deletePartnerSchema = z.object({
  id: z.uuid(),
})

export class DeletePartnerController {
  constructor(
    private readonly partnerRepository: IPartnerRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deletePartnerSchema.parse({
        id: req.params.id,
      })

      const existingPartner = await this.partnerRepository.findById(id)

      if (!existingPartner) {
        throw new NotFoundError('O parceiro não existe.')
      }

      if (existingPartner.logoUrl) {
        this.firebaseStorageService.deleteFile({
          fileUrl: existingPartner.logoUrl,
        })
      }

      await this.partnerRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
