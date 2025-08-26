import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'

export class FindAllNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(_req: Request, res: Response) {
    try {
      const news = await this.newsRepository.findAll()

      res.status(HttpStatus.OK).json(news)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
