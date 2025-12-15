import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/iinternational-scientific-congress-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteInternationalScientificCongressSchema = z.object({
  id: z.uuid(),
})

export class DeleteInternationalScientificCongressController {
  constructor(
    private readonly internationalScientificCongressRepository: IInternationalScientificCongressRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteInternationalScientificCongressSchema.parse({
        id: req.params.id,
      })

      const existingCongress =
        await this.internationalScientificCongressRepository.findById(id)

      if (!existingCongress) {
        throw new NotFoundError('O congresso não existe.')
      }

      await this.internationalScientificCongressRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
