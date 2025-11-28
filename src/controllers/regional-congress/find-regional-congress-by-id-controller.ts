import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IRegionalCongressRepository } from '../../repositories/regional-congress/iregional-congress-repository.d.ts'

extendZodWithOpenApi(z)

export const findRegionalCongressByIdSchema = z.object({
  id: z.string().uuid('ID inválido'),
})

export class FindRegionalCongressByIdController {
  constructor(
    private readonly regionalCongressRepository: IRegionalCongressRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findRegionalCongressByIdSchema.parse(req.params)

      const congress = await this.regionalCongressRepository.findById(id)

      if (!congress) {
        throw new NotFoundError('Congresso regional não encontrado')
      }

      return res.status(HttpStatus.OK).json(congress)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
