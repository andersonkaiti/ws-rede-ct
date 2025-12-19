import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'

extendZodWithOpenApi(z)

export const findPendencyByIdControllerSchema = z.object({
  id: z.uuid(),
})

export class FindPendencyByIdController {
  constructor(private readonly pendencyRepository: IPendencyRepository) {}

  async handle(req: Request, res: Response) {
    const { id } = findPendencyByIdControllerSchema.parse(req.params)

    const pendency = await this.pendencyRepository.findById(id)

    if (!pendency) {
      throw new NotFoundError('Pendência não encontrada.')
    }

    return res.status(HttpStatus.OK).json(pendency)
  }
}
