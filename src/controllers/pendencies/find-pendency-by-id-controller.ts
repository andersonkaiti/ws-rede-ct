import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'

extendZodWithOpenApi(z)

export const findPendencyByIdControllerSchema = z.object({
  pendencyId: z.uuid(),
})

export class FindPendencyByIdController {
  constructor(private readonly pendencyRepository: IPendencyRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { pendencyId } = findPendencyByIdControllerSchema.parse({
        pendencyId: req.params.pendency_id,
      })

      const pendency = await this.pendencyRepository.findById(pendencyId)

      if (!pendency) {
        throw new NotFoundError('Pendência não encontrada.')
      }

      return res.status(HttpStatus.OK).json(pendency)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
