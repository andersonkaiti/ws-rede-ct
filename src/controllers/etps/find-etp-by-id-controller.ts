import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IETPRepository } from '../../repositories/etp/ietp-repository.d.ts'

extendZodWithOpenApi(z)

export const findETPByIdSchema = z.object({
  id: z.uuid(),
})

export class FindETPByIdController {
  constructor(private readonly etpRepository: IETPRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findETPByIdSchema.parse({
        id: req.params.id,
      })

      const etp = await this.etpRepository.findById(id)

      if (!etp) {
        throw new NotFoundError('O ETP não existe.')
      }

      return res.status(HttpStatus.OK).json(etp)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
