import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'

export class FindAllNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const title =
        typeof req.query.title === 'string' ? req.query.title : undefined
      const content =
        typeof req.query.content === 'string' ? req.query.content : undefined
      const author_id =
        typeof req.query.author_id === 'string'
          ? req.query.author_id
          : undefined
      const order_by =
        req.query.order_by === 'asc' || req.query.order_by === 'desc'
          ? req.query.order_by
          : undefined

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
