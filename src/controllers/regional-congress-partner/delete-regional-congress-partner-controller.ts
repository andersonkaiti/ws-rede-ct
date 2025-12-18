import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IRegionalCongressPartnerRepository } from '../../repositories/regional-congress/partner/iregional-congress-partner-repository.js'

extendZodWithOpenApi(z)

export const deleteRegionalCongressPartnerSchema = z.object({
  id: z.string().uuid('ID inválido'),
})

export class DeleteRegionalCongressPartnerController {
  constructor(
    private readonly regionalCongressPartnerRepository: IRegionalCongressPartnerRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteRegionalCongressPartnerSchema.parse(req.params)

    const partner = await this.regionalCongressPartnerRepository.findById(id)

    if (!partner) {
      throw new NotFoundError('Parceiro não encontrado')
    }

    await this.regionalCongressPartnerRepository.deleteById(id)

    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
