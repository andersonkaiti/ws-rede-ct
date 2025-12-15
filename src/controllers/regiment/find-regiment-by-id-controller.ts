import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IRegimentRepository } from '../../repositories/regiment/iregiment-repository.d.ts'

extendZodWithOpenApi(z)

export const findRegimentByIdSchema = z.object({
  id: z.uuid(),
})

export class FindRegimentByIdController {
  constructor(private readonly regimentRepository: IRegimentRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findRegimentByIdSchema.parse({
        id: req.params.id,
      })

      const regiment = await this.regimentRepository.findById(id)

      if (!regiment) {
        throw new NotFoundError('O regimento não existe.')
      }

      return res.status(HttpStatus.OK).json(regiment)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
