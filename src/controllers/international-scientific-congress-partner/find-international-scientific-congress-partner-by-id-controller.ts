import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInternationalScientificCongressPartnerRepository } from '../../repositories/international-scientific-congress/partner/international-scientific-congress-gallery-repository-partner-repository.js'

extendZodWithOpenApi(z)

export const findInternationalScientificCongressPartnerByIdSchema = z.object({
  id: z.uuid(),
})

export class FindInternationalScientificCongressPartnerByIdController {
  constructor(
    private readonly internationalScientificCongressPartnerRepository: IInternationalScientificCongressPartnerRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findInternationalScientificCongressPartnerByIdSchema.parse(
        {
          id: req.params.id,
        },
      )

      const partner =
        await this.internationalScientificCongressPartnerRepository.findById(id)

      if (!partner) {
        throw new NotFoundError('O parceiro não existe.')
      }

      return res.status(HttpStatus.OK).json(partner)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
