import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ILawRepository } from '../../repositories/law/ilaw-repository.d.ts'

extendZodWithOpenApi(z)

export const findLawByIdSchema = z.object({
  id: z.uuid(),
})

export class FindLawByIdController {
  constructor(private readonly lawRepository: ILawRepository) {}

  async handle(req: Request, res: Response) {
    const { id } = findLawByIdSchema.parse({
      id: req.params.id,
    })

    const law = await this.lawRepository.findById(id)

    if (!law) {
      throw new NotFoundError('A lei não existe.')
    }

    return res.status(HttpStatus.OK).json(law)
  }
}
