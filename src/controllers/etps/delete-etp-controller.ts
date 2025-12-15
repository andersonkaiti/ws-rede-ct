import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IETPRepository } from '../../repositories/etp/ietp-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteETPSchema = z.object({
  id: z.uuid(),
})

export class DeleteETPController {
  constructor(private readonly etpRepository: IETPRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteETPSchema.parse({
        id: req.params.id,
      })

      const existingETP = await this.etpRepository.findById(id)

      if (!existingETP) {
        throw new NotFoundError('O ETP não existe.')
      }

      await this.etpRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
