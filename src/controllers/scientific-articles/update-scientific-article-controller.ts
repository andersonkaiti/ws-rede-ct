import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IScientificArticlesRepository } from '../../repositories/scientific-articles/iscientific-articles-repository.ts'

extendZodWithOpenApi(z)

export const updateScientificArticleSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório.').optional(),
  author: z.string().min(1, 'Autor é obrigatório.').optional(),
  journal: z.string().optional(),
  volume: z.string().optional(),
  edition: z.string().optional(),
  pageStart: z.coerce.number().optional(),
  pageEnd: z.coerce.number().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  publisher: z.string().optional(),
  description: z.string().optional(),
  year: z.coerce.number().optional(),
  accessUrl: z.url('URL de acesso deve ser válida').optional(),
})

export class UpdateScientificArticleController {
  constructor(
    private readonly scientificArticlesRepository: IScientificArticlesRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      title,
      author,
      journal,
      volume,
      edition,
      pageStart,
      pageEnd,
      startDate,
      endDate,
      city,
      state,
      country,
      publisher,
      description,
      year,
      accessUrl,
    } = updateScientificArticleSchema.parse({
      id: req.params.id,
      ...req.body,
    })

    const existingScientificArticle =
      await this.scientificArticlesRepository.findById(id)

    if (!existingScientificArticle) {
      throw new NotFoundError('O artigo científico não existe.')
    }

    await this.scientificArticlesRepository.update({
      id,
      title,
      author,
      journal,
      volume,
      edition,
      pageStart,
      pageEnd,
      startDate,
      endDate,
      city,
      state,
      country,
      publisher,
      description,
      year,
      accessUrl,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
