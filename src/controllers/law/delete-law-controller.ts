import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { ILawRepository } from '../../repositories/law/ilaw-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteLawSchema = z.object({
  id: z.uuid(),
})

export class DeleteLawController {
  constructor(private readonly lawRepository: ILawRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteLawSchema.parse({
        id: req.params.id,
      })

      const existingLaw = await this.lawRepository.findById(id)

      if (!existingLaw) {
        throw new NotFoundError('A lei não existe.')
      }

      await this.lawRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
