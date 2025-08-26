import type { Request, Response } from 'express'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

export class CreateNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { title, content, author_id } = req.body

      const image_url = this.firebaseStorageService.uploadFile(req, File.NEWS)

      const news = await this.newsRepository.create({
        title,
        content,
        author_id,
        image_url,
      })

      res.status(HttpStatus.CREATED).json(news)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
