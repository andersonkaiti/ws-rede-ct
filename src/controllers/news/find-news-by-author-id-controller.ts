import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.js'

export class FindByAuthorController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { author_id } = req.params

      const order_by =
        typeof req.query.order_by === 'string' ? req.query.order_by : undefined
      const title =
        typeof req.query.title === 'string' ? req.query.title : undefined
      const content =
        typeof req.query.content === 'string' ? req.query.content : undefined

      const news = await this.newsRepository.findByAuthorId({
        author_id,
        filter: {
          order_by,
          title,
          content,
        },
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
