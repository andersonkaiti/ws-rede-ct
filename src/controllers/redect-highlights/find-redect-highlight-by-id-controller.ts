import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IRedeCTHighlightRepository } from '../../repositories/redect-highlight/iredect-highlight-repository.d.ts'

extendZodWithOpenApi(z)

export const findRedeCTHighlightByIdSchema = z.object({
  id: z.uuid(),
})

export class FindRedeCTHighlightByIdController {
  constructor(
    private readonly redectHighlightRepository: IRedeCTHighlightRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findRedeCTHighlightByIdSchema.parse(req.params)

      const highlight = await this.redectHighlightRepository.findById(id)

      if (!highlight) {
        throw new NotFoundError('Destaque não encontrado.')
      }

      return res.status(HttpStatus.OK).json(highlight)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
