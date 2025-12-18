import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IETPRepository } from '../../repositories/etp/ietp-repository.d.ts'

extendZodWithOpenApi(z)

export const findETPByIdSchema = z.object({
  id: z.uuid(),
})

export class FindETPByIdController {
  constructor(private readonly etpRepository: IETPRepository) {}

  async handle(req: Request, res: Response) {
    const { id } = findETPByIdSchema.parse({
      id: req.params.id,
    })

    const etp = await this.etpRepository.findById(id)

    if (!etp) {
      throw new NotFoundError('O ETP não existe.')
    }

    return res.status(HttpStatus.OK).json(etp)
  }
}
