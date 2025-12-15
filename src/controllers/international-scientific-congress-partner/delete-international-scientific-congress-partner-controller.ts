import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInternationalScientificCongressPartnerRepository } from '../../repositories/international-scientific-congress/partner/international-scientific-congress-gallery-repository-partner-repository.js'

extendZodWithOpenApi(z)

export const deleteInternationalScientificCongressPartnerSchema = z.object({
  id: z.uuid(),
})

export class DeleteInternationalScientificCongressPartnerController {
  constructor(
    private readonly internationalScientificCongressPartnerRepository: IInternationalScientificCongressPartnerRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteInternationalScientificCongressPartnerSchema.parse({
        id: req.params.id,
      })

      const existingPartner =
        await this.internationalScientificCongressPartnerRepository.findById(id)

      if (!existingPartner) {
        throw new NotFoundError('O parceiro não existe.')
      }

      await this.internationalScientificCongressPartnerRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
