import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IPartnerRepository } from '../../repositories/partner/ipartner-repository.d.ts'

extendZodWithOpenApi(z)

export const findPartnerByIdSchema = z.object({
  id: z.uuid(),
})

export class FindPartnerByIdController {
  constructor(private readonly partnerRepository: IPartnerRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findPartnerByIdSchema.parse({
        id: req.params.id,
      })

      const partner = await this.partnerRepository.findById(id)

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
