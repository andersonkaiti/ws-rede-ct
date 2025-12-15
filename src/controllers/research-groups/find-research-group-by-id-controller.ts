import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IResearchGroupRepository } from '../../repositories/research-group/iresearch-group-repository.ts'

extendZodWithOpenApi(z)

export const findResearchGroupByIdSchema = z.object({
  id: z.uuid(),
})

export class FindResearchGroupByIdController {
  constructor(
    private readonly researchGroupRepository: IResearchGroupRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findResearchGroupByIdSchema.parse({
        id: req.params.id,
      })

      const researchGroup = await this.researchGroupRepository.findById(id)

      if (!researchGroup) {
        throw new NotFoundError('Grupo de pesquisa não encontrado.')
      }

      return res.status(HttpStatus.OK).json(researchGroup)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
