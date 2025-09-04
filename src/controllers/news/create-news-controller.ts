import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const createNewsSchema = z.object({
  author_id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
})

export class CreateNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = createNewsSchema.safeParse(req.body)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.treeifyError(parseResult.error),
        })
      }
      const { title, content, author_id } = parseResult.data

      const image_url = await this.firebaseStorageService.uploadFile(
        req,
        File.NEWS
      )

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
