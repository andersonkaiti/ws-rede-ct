import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IRegionalCongressPartnerRepository } from '../../repositories/regional-congress/partner/iregional-congress-partner-repository.js'

extendZodWithOpenApi(z)

export const findRegionalCongressPartnerByIdSchema = z.object({
  id: z.string().uuid('ID inválido'),
})

export class FindRegionalCongressPartnerByIdController {
  constructor(
    private readonly regionalCongressPartnerRepository: IRegionalCongressPartnerRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findRegionalCongressPartnerByIdSchema.parse(req.params)

      const partner = await this.regionalCongressPartnerRepository.findById(id)

      if (!partner) {
        throw new NotFoundError('Parceiro não encontrado')
      }

      return res.status(HttpStatus.OK).json(partner)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
