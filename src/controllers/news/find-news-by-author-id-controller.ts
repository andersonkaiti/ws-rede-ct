import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.js'

export class FindByAuthorController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { author_id } = req.params

      const orderBy =
        typeof req.query.orderBy === 'string' ? req.query.orderBy : undefined
      const updated_at =
        typeof req.query.date === 'string' ? req.query.date : undefined
      const title =
        typeof req.query.title === 'string' ? req.query.title : undefined
      const content =
        typeof req.query.content === 'string' ? req.query.content : undefined

      const news = await this.newsRepository.findByAuthorId({
        author_id,
        filter: {
          orderBy,
          updated_at,
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
