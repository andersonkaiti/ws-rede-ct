import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IScientificArticlesRepository } from '../../repositories/scientific-articles/iscientific-articles-repository.ts'

extendZodWithOpenApi(z)

export const createScientificArticleSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório.'),
  author: z.string().min(1, 'Autor é obrigatório.'),
  journal: z.string().optional(),
  volume: z.string().optional(),
  edition: z.string().optional(),
  pageStart: z.coerce.number().optional(),
  pageEnd: z.coerce.number().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  publisher: z.string().optional(),
  description: z.string().optional(),
  year: z.coerce.number().optional(),
  accessUrl: z.url().optional(),
})

export class CreateScientificArticleController {
  constructor(
    private readonly scientificArticlesRepository: IScientificArticlesRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const {
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
    } = createScientificArticleSchema.parse(req.body)

    await this.scientificArticlesRepository.create({
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

    return res.sendStatus(HttpStatus.CREATED)
  }
}
