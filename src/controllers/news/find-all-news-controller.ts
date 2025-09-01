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
      const updated_at =
        typeof req.query.updated_at === 'string'
          ? req.query.updated_at
          : undefined
      const author_id =
        typeof req.query.author_id === 'string'
          ? req.query.author_id
          : undefined

      const news = await this.newsRepository.findAll({
        author_id,
        content,
        title,
        updated_at,
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
