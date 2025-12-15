import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IInMemoriamRepository } from '../../repositories/in-memoriam/iin-memoriam-repository.js'

extendZodWithOpenApi(z)

export const findInMemoriamByIdSchema = z.object({
  id: z.uuid(),
})

export class FindInMemoriamByIdController {
  constructor(private readonly inMemoriamRepository: IInMemoriamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findInMemoriamByIdSchema.parse({
        id: req.params.id,
      })

      const inMemoriam = await this.inMemoriamRepository.findById(id)

      if (!inMemoriam) {
        throw new NotFoundError('O in memoriam não existe.')
      }

      return res.status(HttpStatus.OK).json(inMemoriam)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
