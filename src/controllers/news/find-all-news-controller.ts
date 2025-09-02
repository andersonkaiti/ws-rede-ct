import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'

const findAllNewsSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  author_id: z.string().optional(),
  order_by: z
    .union([z.enum(['asc', 'desc']), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

export class FindAllNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        author_id,
        content,
        order_by = 'desc',
        title,
      } = findAllNewsSchema.parse({
        title: req.query.title,
        content: req.query.content,
        author_id: req.query.author_id,
        order_by: req.query.order_by,
      })

      const news = await this.newsRepository.findAll({
        author_id,
        content,
        title,
        order_by,
      })

      res.status(HttpStatus.OK).json(news)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
