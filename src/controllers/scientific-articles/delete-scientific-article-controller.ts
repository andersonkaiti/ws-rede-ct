import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IScientificArticlesRepository } from '../../repositories/scientific-articles/iscientific-articles-repository.ts'

extendZodWithOpenApi(z)

export const deleteScientificArticleSchema = z.object({
  id: z.uuid(),
})

export class DeleteScientificArticleController {
  constructor(
    private readonly scientificArticlesRepository: IScientificArticlesRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteScientificArticleSchema.parse({
        id: req.params.id,
      })

      const existingScientificArticle =
        await this.scientificArticlesRepository.findById(id)

      if (!existingScientificArticle) {
        throw new NotFoundError('O artigo científico não existe.')
      }

      await this.scientificArticlesRepository.deleteById(id)

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
