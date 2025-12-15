import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IResearcherRepository } from '../../repositories/researcher/iresearcher-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteResearcherSchema = z.object({
  id: z.uuid(),
})

export class DeleteResearcherController {
  constructor(private readonly researcherRepository: IResearcherRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteResearcherSchema.parse({
        id: req.params.id,
      })

      const existingResearcher = await this.researcherRepository.findById(id)

      if (!existingResearcher) {
        throw new NotFoundError('O pesquisador não existe.')
      }

      await this.researcherRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
