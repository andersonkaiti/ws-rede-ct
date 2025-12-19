import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/iinternational-scientific-congress-repository.d.ts'

extendZodWithOpenApi(z)

export const findInternationalScientificCongressByIdSchema = z.object({
  id: z.uuid(),
})

export class FindInternationalScientificCongressByIdController {
  constructor(
    private readonly internationalScientificCongressRepository: IInternationalScientificCongressRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = findInternationalScientificCongressByIdSchema.parse({
      id: req.params.id,
    })

    const congress =
      await this.internationalScientificCongressRepository.findById(id)

    if (!congress) {
      throw new NotFoundError('O congresso não existe.')
    }

    return res.status(HttpStatus.OK).json(congress)
  }
}
